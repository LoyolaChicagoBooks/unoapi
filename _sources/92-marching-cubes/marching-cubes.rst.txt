Marching Cubes: From CUDA to SYCL
=================================

This Gist provides a walkthrough of the marching cubes algorithm
implemented in CUDA. The code can be found in its entirety here (enter
hyperlink later). We start by briefly reviewing how parallelization
works in CUDA. We then take a look at some of the key kernels being used
in a CUDA implementation of the marching cubes algorithm. Those CUDA
kernels are then put through the SYCLomatic tool, a tool developed to
aid in the porting of code from other languages to SYCL. We then clean
up the output of the SYCLomatic tool into a final working version of
SYCL kernels.

A Brief CUDA Reivew
-------------------

CUDA enables parallelization by allowing the programmer to define a
kernel that is executed by a large numberof threads concurrently. Each
thread processes a small portion of the data, and the collective work of
all threads achieves the overall computation. The combination of thread
and block indices allows each thread to work on a unique subset of the
data, thus ensuring that the entire dataset is processed in parallel. …
more stuff about how cuda works

Kernels Being Used
------------------

List them here

CUDA vs SYCL Implementations
----------------------------

Classify Voxel Kernel - CUDA:
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The ``classifyVoxel`` kernel classifies each voxel in a 3D grid based on
the number of vertices it will generate. Let’s breakdown how it works:

.. code:: cpp

   __global__ void classifyVoxel(uint *voxelVerts, uint *voxelOccupied, uchar *volume, uint3 gridSize,
   uint3 gridSizeShift, uint3 gridSizeMask, uint numVoxels, float3 voxelSize, float isoValue, cudaTextureObject_t numVertsTex, cudaTextureObject_t volumeTex) {
       // Calculate the unique index for this thread within the entire grid
       uint blockId = __mul24(blockIdx.y, gridDim.x) + blockIdx.x;
       uint i = __mul24(blockId, blockDim.x) + threadIdx.x;

       // Compute the position in the 3D grid
       uint3 gridPos = calcGridPos(i, gridSizeShift, gridSizeMask);

       //Read field values at the 8 neighboring grid vertices
       float field[8];
       field[0] = sampleVolume(volumeTex, volume, gridPos, gridSize);
       field[1] = sampleVolume(volumeTex, volume, gridPos + make_uint3(1, 0, 0), gridSize);
       field[2] = sampleVolume(volumeTex, volume, gridPos + make_uint3(1, 1, 0), gridSize);
       field[3] = sampleVolume(volumeTex, volume, gridPos + make_uint3(0, 1, 0), gridSize);
       field[4] = sampleVolume(volumeTex, volume, gridPos + make_uint3(0, 0, 1), gridSize);
       field[5] = sampleVolume(volumeTex, volume, gridPos + make_uint3(1, 0, 1), gridSize);
       field[6] = sampleVolume(volumeTex, volume, gridPos + make_uint3(1, 1, 1), gridSize);
       field[7] = sampleVolume(volumeTex, volume, gridPos + make_uint3(0, 1, 1), gridSize);
       
       // Calculate a falg indicating if each vertex is inside of outside the isosurface
       uint cubeindex = uint(field[0] < isoValue);
       cubeindex += uint(field[1] < isoValue) * 2;
       cubeindex += uint(field[2] < isoValue) * 4;
       cubeindex += uint(field[3] < isoValue) * 8;
       cubeindex += uint(field[4] < isoValue) * 16;
       cubeindex += uint(field[5] < isoValue) * 32;
       cubeindex += uint(field[6] < isoValue) * 64;
       cubeindex += uint(field[7] < isoValue) * 128;

       //Read the number of vertices from the texture
       uint numVerts = tex1Dfetch<uint>(numVertsTex, cubeindex);

       // If the voxel index is within bounds, store the number of vertices and occupancy
       if (i < numVoxels) {
           voxelVerts[i] = numVerts;
           voxelOccupied[i] = (numVerts > 0);
       }

       // Print the results to verify the SYCL equivalent kernel produces the same results
       if (i < numVoxels) {
           printf("Voxel %u: numVerts=%u, occupied=%u\n", i, numVerts, voxelOccupied[i]);
       }
   }

The kernel starts by assigning each thread a uinque index ``i`` by
calculating ``blockId`` and multiplying it by the number of threads per
block. This index ``i`` corresponds to a specific voxel in the grid.

.. code:: cpp

   uint blockId = __mul24(blockIdx.y, gridDim.x) + blockIdx.x;
   uint i = __mul24(blockId, blockDim.x) + threadIdx.x;

The 1D index ``i`` is then converted to a 3D grid position ``gridPos``
by using the ``calcGridPos`` function. This is needed for locating the
voxel’s position in the 3D volume.

.. code:: cpp

   uint3 gridPos = calcGridPos(i, gridSizeShift, gridSizeMask);

The field values at the eight corners of the voxel are then sampled
using the ``sampleVolume`` function, which accesses the volume data
through the texture object ``volumeTex``.

.. code:: cpp

   float field[8];
   field[0] = sampleVolume(volumeTex, volume, gridPos, gridSize);
   field[1] = sampleVolume(volumeTex, volume, gridPos + make_uint3(1, 0, 0), gridSize);
   field[2] = sampleVolume(volumeTex, volume, gridPos + make_uint3(1, 1, 0), gridSize);
   field[3] = sampleVolume(volumeTex, volume, gridPos + make_uint3(0, 1, 0), gridSize);
   field[4] = sampleVolume(volumeTex, volume, gridPos + make_uint3(0, 0, 1), gridSize);
   field[5] = sampleVolume(volumeTex, volume, gridPos + make_uint3(1, 0, 1), gridSize);
   field[6] = sampleVolume(volumeTex, volume, gridPos + make_uint3(1, 1, 1), gridSize);
   field[7] = sampleVolume(volumeTex, volume, gridPos + make_uint3(0, 1, 1), gridSize);

Each corner’s field value then needs to be compared to the ``isoValue``.
If if field value is less than the ``isoValue``, the corresponding bit
in ``cubeindex`` is set. The ``cubeindex`` thus forms a unique
identifier representing the voxel’s classification.

.. code:: cpp

   uint cubeindex = uint(field[0] < isoValue);
   cubeindex += uint(field[1] < isoValue) * 2;
   cubeindex += uint(field[2] < isoValue) * 4;
   cubeindex += uint(field[3] < isoValue) * 8;
   cubeindex += uint(field[4] < isoValue) * 16;
   cubeindex += uint(field[5] < isoValue) * 32;
   cubeindex += uint(field[6] < isoValue) * 64;
   cubeindex += uint(field[7] < isoValue) * 128;

The number of vertices for the given ``cubeindex`` is then fetched from
the texure ``numVertsTex``. This lookup is essential for determining how
many vertices the voxel will generate.

.. code:: cpp

   uint numVerts = tex1Dfetch<uint>(numVertsTex, cubeindex);

Lastly, the voxel index ``i`` is checked to see if it within bounds. If
it is, the numberof vertices and occupancy status are stored in
``voxelVerts`` and ``voxelOccupied`` arrays, respectively.

.. code:: cpp

   if (i < numVoxels) {
       voxelVerts[i] = numVerts;
       voxelOccupied[i] = (numVerts > 0);

We also print the voxel index, number of vertices, and occupancy status,
as we will check this output against a SYCL equivalent kernel later.

Classify Voxel Kernel - SYCL
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Below we can see the output of SYCLomatic when converting the above CUDA
kernel to SYCL. While the tool gets the programmer very far in the
porting process, you will see that it is not 100% porting solution, and
some portions of the code need to be manually addressed.

.. code:: cpp

   void classifyVoxel(uint *voxelVerts, uint *voxelOccupied, uchar *volume, sycl::uint3 gridSize,
                      sycl::uint3 gridSizeShift, sycl::uint3 gridSizeMask, uint numVoxels,
                      sycl::float3 voxelSize, float isoValue,
                      dpct::image_accessor_ext<dpct_placeholder /* Fix this manually */, 1> numVertsTex,
                      dpct::image_accessor_ext<dpct_placeholder /* Fix this manually */, 1> volumeTex,
                      const sycl::nd_item<3> &item_ct1) {
       
       uint blockId = sycl::mul24((int)item_ct1.get_group(1), (int)item_ct1.get_group_range(2)) + item_ct1.get_group(2);

       uint i = sycl::mul24((int)blockId, (int)item_ct1.get_local_range(2)) + item_ct1.get_local_id(2);

       sycl::uint3 gridPos = calcGridPos(i, gridSizeShift, gridSizeMask);

       float field[8];
       field[0] = sampleVolume(volumeTex, volume, gridPos, gridSize);
       field[1] = sampleVolume(volumeTex, volume, gridPos + sycl::uint3(1, 0, 0), gridSize);
       field[2] = sampleVolume(volumeTex, volume, gridPos + sycl::uint3(1, 1, 0), gridSize);
       field[3] = sampleVolume(volumeTex, volume, gridPos + sycl::uint3(0, 1, 0), gridSize);
       field[4] = sampleVolume(volumeTex, volume, gridPos + sycl::uint3(0, 0, 1), gridSize);
       field[5] = sampleVolume(volumeTex, volume, gridPos + sycl::uint3(1, 0, 1), gridSize);
       field[6] = sampleVolume(volumeTex, volume, gridPos + sycl::uint3(1, 1, 1), gridSize);
       field[7] = sampleVolume(volumeTex, volume, gridPos + sycl::uint3(0, 1, 1), gridSize);

       uint cubeindex;
       cubeindex = uint(field[0] < isoValue);
       cubeindex += uint(field[1] < isoValue) * 2;
       cubeindex += uint(field[2] < isoValue) * 4;
       cubeindex += uint(field[3] < isoValue) * 8;
       cubeindex += uint(field[4] < isoValue) * 16;
       cubeindex += uint(field[5] < isoValue) * 32;
       cubeindex += uint(field[6] < isoValue) * 64;
       cubeindex += uint(field[7] < isoValue) * 128;

       uint numVerts = tex1Dfetch<uint>(numVertsTex, cubeindex);

       if (i < numVoxels) {
           voxelVerts[i] = numVerts;
           voxelOccupied[i] = (numVerts > 0);
       }

       if (i < numVoxels) {
           printf("Voxel %u: numVerts=%u, occupied=%u\n", i, numVerts, voxelOccupied[i]);
       }
   }

   extern "C" void launch_classifyVoxel(sycl::range<3> grid, sycl::range<3> threads, uint *voxelVerts,
                                        uint *voxelOccupied, uchar *volume, sycl::uint3 gridSize,
                                        sycl::uint3 gridSizeShift, sycl::uint3 gridSizeMask, uint numVoxels,
                                        sycl::float3 voxelSize, float isoValue) {

       dpct::get_in_order_queue().submit([&](sycl::handler &cgh) {
           auto numVertsTex_acc = static_cast<dpct::image_wrapper<
               dpct_placeholder /* Fix this manually */, 1> *>(numVertsTex) -> get_access(cgh);
           auto volumeTex_acc = static_cast<dpct::image_wrapper<
               dpct_placeholder /* Fix this manually */, 1> *>(volumeTex) -> get_access(cgh);

           auto numVertsTex_smpl = numVertsTex -> get_sampler();
           auto volumeTex_smplt = volumeTex -> get_sampler();

           cgh.parallel_for(sycl::nd_range<3>(grid * threads, threads), [=](sycl::nd_item<3> item_ct1) {
               classifyVoxel(
                   voxelVerts, voxelOccupied, volume, gridSize, gridSizeShift,
                   gridSizeMask, numVoxels, voxelSize, isoValue,
                   dpct::image_accessor_ext<dpct_placeholder /* Fix this manually */, 1>(
                       numVertsTex_smpl, numVertsTex_acc),
                   dpct::image_accessor_ext<dpct_placeholder /* Fix this manually */, 1>(
                       volumeTex_smpl, volumeTex_acc),
                   item_ct1);
           });
       });
       
       getLastCudaError("classifyVoxel failed");
   }

**Thread and Block Indices:**

SYCLomatic uses SYCL’s ``nd_iem`` to handle thread and block indices,
analogous to CUDA’s ``blockIdx``, ``threadIdx``, and ``blockDim``.

.. code:: cpp

   uint blockId = sycl::mul24((int)item_ct1.get_group(1), (int)item_ct1.get_group_range(2)) + item_ct2.get_group(2);
   uint i = sycl::mul24((int)blockId, (int)item_ct1.get_local_range(2)) + item_ct1.get_local_id(2);

**Grid Position Calculation:**

The function ``calcGridPos`` remains unchanged and works the same way as
in CUDA.

.. code:: cpp

   sycl::uint3 gridPos = calcGridPos(i, gridSizeShift, gridSizeMask);

**Field Value Sampling:**

The texture access functions are replaces by SYCL equivalents.
``sampleVolume`` is called the same way as in CUDA.

.. code:: cpp

   float field[8];
   field[0] = sampleVolume(volumeTex, volume, gridPos, gridSize);
   field[1] = sampleVolume(volumeTex, volume, gridPos + sycl::uint3(1, 0, 0), gridSize);
   ...

**Isosurface Classification and Number of Vertices Lookup**

The operations for comparing field values and fetching the number of
vertices are similar in SYCL.

.. code:: cpp

   uint cubeindex;
   cubeindex = uint(field[0] < isoValue);
   cubeindex += uint(field[1] < isoValue) * 2;
   cubeindex += uint(field[2] < isoValue) * 4;
   cubeindex += uint(field[3] < isoValue) * 8;
   cubeindex += uint(field[4] < isoValue) * 16;
   cubeindex += uint(field[5] < isoValue) * 32;
   cubeindex += uint(field[6] < isoValue) * 64;
   cubeindex += uint(field[7] < isoValue) * 128;
   uint numVerts = tex1Dfetch<uint>(numVertsTex, cubeindex);

The code for storing the results and printing remains the same.

Compact Voxels Kernel - CUDA
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The ``compactVoxels`` kernel is crucial for compacting the voxel arrary
by eliminating empty voxels and creating a contiguous array of active
voxels.

.. code:: cpp

   __global__ void compactVoxels(uint *compactedVoxelArray, uint *voxelOccupied, uint *voxelOccupiedScan,
                                                                                 uint numVoxels) {
       uint blockId = __mul24(blockIdx.y, gridDim.x) + blockIdx.x;
       uint i = __mul24(blockId, blockDim.x) + threadIdx.x;

       if (voxelOccupied[i] && (i < numVoxels)) {
           compactedVoxelArray[voxelOccupiedScan[i]] = i;
       }

       if (voxelOccupied[i] && (i < numVoxels)) {
           printf("Compact voxel %u: compactedIndex=%u\n", i, voxelOccupiedScan[i]);
       }
   }

**Thread and Block Indices**

CUDA organizes threads into blocks and blocks into grids. Each thread
has a unique index within its block, and each block has a unique index
within the grid.

.. code:: cpp

   uint blockId = __mul24(blockIdx.y, gridDim.x) + blockIdx.x;
   uint i = __mul24(blockId, blockDim.x) + threadIdx.x;

-  ``blockIdx.y`` and ``blockIdx.x`` are the block indices in the y and
   x dimensions of the grid.
-  ``gridDim.x`` is the number of blocks in the x dimension.
-  ``blockDim.x`` is the number of threads in a block.
-  ``threadIdx.x`` is the thread index within the block.

The global thread index ``i`` is computed to uniquely identify each
thread’s work item.

**Compaction Condition:** - Each thread checks if the voxel at index
``i`` is occupied and if ``i`` is within our bounds.

.. code:: cpp

   if (voxelOccupied[i] && (i < numVoxels)) {

-  ``voxelOccupied[i]`` is a boolean array indicating whether the voxel
   at index ``i`` is occupied.
-  ``numVoxels`` is the total number of voxels.

**Compaction Operation** If the voxel is occupied, the kernel writes the
voxel’s index to the ``compactedVoxelArray`` at the position specified
by ``voxelOccupiedScan[i]``.

.. code:: cpp

   compactedVoxelArray[voxelOccupiedScan[i]] = i;

-  ``voxelOccupiedScan`` is an array that contains the result of the
   prefix sum operation on ``voxelOccupied``. It provides the position
   in the compacted array for each occupied voxel.

We again have the kernel print the voxel index and its new compacted
index to check this against the SYCL version.

Compact Voxels Kernel - SYCL
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This is the output of the above CUDA kernel when put through SYCLomatic.

.. code:: cpp

   void compactVoxels(uint *compactedVoxelArray, uint *voxelOccupied, uint *voxelOccupiedScan, uint numVoxels,
                      const sycl::nd_item<3> &item_ct1) {
       
       uint blockId = sycl::mul24((int)item_ct1.get_group(1), (int)item_ct1.get_group_range(2)) + item_ct1.get_group(2);
       uint i = sycl::mul24((int)blockId, (int)item_ct1.get_local_range(2)) + item_ct1.get_local_id(2);

       if (voxelOccupied[i] && (i < numVoxels)) {
           compactedVoxelArray[voxelOccupiedScan[i]] = i;
       }

       if (voxelOccupied[i] && (i < numVoxels)) {
           printf("Compact voxel %u: compactedIndex=%u\n", i, voxelOccupiedScan[i]);
       }
   }

   extern "C" void launch_compactVoxels(sycl::range<3> grid, sycl::range<3> threads, uint *compactedVoxelArray,
                                        uint *voxelOccupied, uint *voxelOccupiedScan, uint numVoxels) {
       
       dpct::get_in_order_queue().parllel_for(sycl::nd_range<3>(grid * threads, threads),
                                              [=](sycl::nd_item<3> item_ct1) {
           compactVoxels(compactedVoxelArray, voxelOccupied, voxelOccupiedScan, numVoxels, item_ct1);
       });

       getLastCudaError("compactVoxels failed");
   }

**Thread and Block Indices**

We again see that SYCLomatic uses SYCL’s ``nd_item`` to handle thread
and block indices, just as CUDA would use ``blockIdx``, ``threadIdx``,
and ``blockDim``.

.. code:: cpp

   uint blockId = sycl::mul24((int)item_ct1.get_group(1), (int)item_ct1.get_group_range(2)) + item_ct1.get_group(2);
   uint i = sycl::mul24((int)blockId, (int)item_ct1.get_local_range(2)) + item_ct1.get_local_id(2);

**Compaction Condition and Operation**

The compaction condition and operation are directly translated to SYCL,
maintaining the same logic as in CUDA.

.. code:: cpp

   if (voxelOccupied[i] && (i < numVoxels)) {
       compactedVoxelArray[voxelOccupiedScan[i]] = i;
   }

**Kernel Launch**

The ``launch_compactVoxels`` function in SYCL uses
``dpct::get_in_order_queue().parallel_for`` to submit the kernel for
execution (talk more about the extern C stuff…)

.. code:: cpp

   extern "C" void launch_compactVoxels(sycl::range<3> grid, sycl::range<3> threads, uint *compactedVoxelArray,
                                        uint *voxelOccupied, uint *voxelOccupiedScan, uint numVoxels) {

       dpct::get_in_order_queue().parallel_for(sycl::nd_range<3>(grid * threads, threads),
                                               [=](sycl::nd_item<3> item_ct1) {
           compactVoxels(compactedVoxelArray, voxelOccupied, voxelOccupiedScan, numVoxels, item_ct1);
       });

       getLastCudaError("compactVoxels failed");
   }

Generate Triangles Kernel - CUDA:
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The ``generateTriangles`` kernel is the heart of the marching cubes
algorithm, responsible for generating the actual triangles that form the
isosurface. This kernel takes the compacted voxel array and, for each
active voxel, generates the necessary vertices and normals for the
triangles.

The kernel starts by assigning each thread a unique index ``i`` by
calculating ``blockId`` and multiplying it by the number of threads per
block. This index ``i`` corresponds to a specific voxel in the compacted
voxel array.

.. code:: cpp

   __global__ void generateTriangles(float4 *pos, float4 *norm, uint *compactedVoxelArray, uint *numVertsScanned,
                                     uint3 gridSize, uint3 gridSizeShift, uint3 gridSizeMask, float3 voxelSize,
                                     float isoValue, uint activeVoxels, uint maxVerts, cudaTextureObject_t triTex,
                                     cudaTextureObject_t numvertsTex) {
       
       uint blockId = __mul24(blockIdx.y, gridDim.x) + blockIdx.x;
       uint i = __mul24(blockId, blockDim.x) + threadIdx.x;
       
       if (i > activeVoxels - 1) {
           i = activeVoxels - 1);
       }

       uint voxel = compactedVoxelArray[i];
       uint3 gridPos = calcGridPos(voxel, gridSizeShift, gridSizeMask);

       float3 p;
       p.x = -1.0f + (gridPos.x * voxelSize.x);
       p.y = -1.0f + (gridPos.y * voxelSize.y);
       p.z = -1.0f + (gridPos.z * voxelSize.z);

       float3 v[8];
       v[0] = p;
       v[1] = p + make_float3(voxelSize.x, 0, 0);
       v[2] = p + make_float3(voxelSize.x, voxelSize.y, 0);
       v[3] = p + make_float3(0, voxelSize.y, 0);
       v[4] = p + make_float3(0, 0, voxelSize.z);
       v[5] = p + make_float3(voxelSize.x, 0, voxelSize.z);
       v[6] = p + make_float3(voxelSize.x, voxelSize.y, voxelSize.z);
       v[7] = p + make_float3(0, voxelSize.y, voxelSize.z);

       float4 field[8];
       field[0] = fieldFunc4(v[0]);
       field[1] = fieldFunc4(v[1]);
       field[2] = fieldFunc4(v[2]);
       field[3] = fieldFunc4(v[3]);
       field[4] = fieldFunc4(v[4]);
       field[5] = fieldFunc4(v[5]);
       field[6] = fieldFunc4(v[6]);
       field[7] = fieldFunc4(v[7]);

       uint cubeindex;
       cubeindex = uint(field[0].w < isoValue);
       cubeindex = uint(field[1].w < isoValue) * 2;
       cubeindex = uint(field[2].w < isoValue) * 4;
       cubeindex = uint(field[3].w < isoValue) * 8;
       cubeindex = uint(field[4].w < isoValue) * 16;
       cubeindex = uint(field[5].w < isoValue) * 32;
       cubeindex = uint(field[6].w < isoValue) * 64;
       cubeindex = uint(field[7].w < isoValue) * 128;

       float3 vertlist[12];
       float3 normlist[12];

       vertexInterp2(isoValue, v[0], v[1], field[0], field[1], vertlist[0], normlist[0]);
       vertexInterp2(isoValue, v[1], v[2], field[1], field[2], vertlist[1], normlist[1]);
       vertexInterp2(isoValue, v[2], v[3], field[2], field[3], vertlist[2], normlist[2]);
       vertexInterp2(isoValue, v[3], v[0], field[3], field[0], vertlist[3], normlist[3]);
       
       vertexInterp2(isoValue, v[4], v[5], field[4], field[5], vertlist[4], normlist[4]);
       vertexInterp2(isoValue, v[5], v[6], field[5], field[6], vertlist[5], normlist[5]);
       vertexInterp2(isoValue, v[6], v[7], field[6], field[7], vertlist[6], normlist[6]);
       vertexInterp2(isoValue, v[7], v[4], field[7], field[4], vertlist[7], normlist[7]);

       vertexInterp2(isoValue, v[0], v[4], field[0], field[4], vertlist[8], normlist[8]);
       vertexInterp2(isoValue, v[1], v[5], field[1], field[5], vertlist[9], normlist[9]);
       vertexInterp2(isoValue, v[2], v[6], field[2], field[6], vertlist[10], normlist[10]);
       vertexInterp2(isoValue, v[3], v[7], field[3], field[7], vertlist[11], normlist[11]);

       uint numVerts = tex1Dfetch<uint>(numVertsTex, cubeindex);

       for (int i = 0; i < numVerts; i++) {
           uint edge = tex1Dfetch<uint>(triTex, cubeindex * 16 + i);
           uint index = numVertsScanned[voxel] + i;

           if (index < maxVerts) {
               pos[index] = make_float4(vertlist[edge], 1.0f);
               norm[index] = make_float4(normlist[edge], 0.0f);
           }
       }
   }

The first step in the kernel is to calculate the unique index for the
thread within the entire grid. This index ``i`` is used to fetch the
voxel index from the compacted voxel array.

The kernel then computes the 3D grid position of the voxel using the
``calcGridPos`` function. This 3D position is necessary to determine the
coordinates of the voxel’s corners in the volume.

The positions of the voxel’s eight corners are calculated relative to
the 3D grid position and the voxel size. These positions are stored in
the ``v`` array.

Next, the field values at these eight corners are evaluated using the
``fieldFunc4`` function, which returns both the field value and its
gradient at each corner. These values are stored in the ``field`` array.

The ``cubeindex`` is then calcualted by comparing each field value to
the isovalue. The ``cubeindex`` is a unique identifier representing the
classification of the voxel based on the isovalue.

The vertices where the isosurface intersects the cube edges are computed
using the ``vertexInterp2`` function. This function interpolates the
positions and normals of the vertices along the edges of the cube. These
vertices are stored in the ``vertlist`` and ``normlist`` arrays,
respectively.

The number of vertiecs for the given ``cubeindex`` is fetched from the
``numVertsTex`` texture. This value indicates how many verties are
needed to form the triangles for this voxel.

Finally, the kerne. iterates over the required number of vertices,
fetching the corresponding edge indices from the ``triTex`` texture. It
then writes the positions and normals of these verties to the output
arrays ``pos`` and ``norm``.

Generate Triangles Kernel - SYCL:
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

When we use SYCLomatic to convert the above into SYCL, the
``generateTriangles`` kernel retains the same logic but adapts to the
SYCL programming model. Here is the output:

.. code:: cpp

   void generateTriangles(float4 *pos, float4 *norm, uint *compactedVoxelArray, uint *numVertsScanned,
                          sycl::uint3 gridSize, sycl::uint3 gridSizeShift, sycl::uint3 gridSizeMask,
                          sycl::float3 voxelSize, float isoValue, uint activeVoxels, uint maxVerts,
                          dpct::image_accessor_ext<dpct_placeholder /* Fix this manually */, 1> triTex,
                          dpct::image_accessor_ext<dpct_placeholder /* Fix this manually */, 1> numVertsTex,
                          const sycl::nd_item<3> &item_ct1) {

       uint blockId = sycl::mul24((int)item_ct1.get_group(1), (int)item_ct1.get_group_range(2)) + item_ct1.get_group(2);
       uint i = sycl::mul24((int)blockId, (int)item_ct1.get_local_range(2)) + item_Ct1.get_local_id(2);

       if (i > activeVoxels - 1) {
           i = activeVoxels - 1;
       }

       uint voxel = compactedVoxelArray[i];
       sycl::uint3 gridPos = calcGridPos(voxel, gridSizeShift, gridSizeMask);

       sycl::float3 p;
       p.x = -1.0f + (gridPos.x * voxelSize.x);
       p.y = -1.0f + (gridPos.y * voxelSize.y);
       p.z = -1.0f + (gridPos.z * voxelSize.z);

       sycl::float3 v[8];
       v[0] = p;
       v[1] = p + sycl::float3(voxelSize.x, 0, 0);
       v[2] = p + sycl::float3(voxelSize.x, voxelSize.y, 0);
       v[3] = p + sycl::float3(0, voxelSize.y, 0);
       v[4] = p + sycl::float3(0, 0, voxelSize.z);
       v[5] = p + sycl::float3(voxelSize.x, 0, voxelSize.z);
       v[6] = p + sycl::float3(voxelSize.x, voxelSize.y, voxelSize.z);
       v[7] = p + sycl::float3(0, voxelSize.y, voxelSize.z);

       sycl::float4 field[8];
       field[0] = fieldFunc4(v[0]);
       field[1] = fieldFunc4(v[1]);
       field[2] = fieldFunc4(v[2]);
       field[3] = fieldFunc4(v[3]);
       field[4] = fieldFunc4(v[4]);
       field[5] = fieldFunc4(v[5]);
       field[6] = fieldFunc4(v[6]);
       field[7] = fieldFunc4(v[7]);

       uint cubeindex;
       cubeindex = uint(field[0].w < isoValue);
       cubeindex += uint(field[1].w < isoValue) * 2;
       cubeindex += uint(field[2].w < isoValue) * 4;
       cubeindex += uint(field[3].w < isoValue) * 8;
       cubeindex += uint(field[4].w < isoValue) * 16;
       cubeindex += uint(field[5].w < isoValue) * 32;
       cubeindex += uint(field[6].w < isoValue) * 64;
       cubeindex += uint(field[7].w < isoValue) * 128;

       sycl::float3 vertlist[12];
       sycl::float3 normlist[12];

       vertexInterp2(isoValue, v[0], v[1], field[0], field[1], vertlist[0], normlist[0]);
       vertexInterp2(isoValue, v[1], v[2], field[1], field[2], vertlist[1], normlist[1]);
       vertexInterp2(isoValue, v[2], v[3], field[2], field[3], vertlist[2], normlist[2]);
       vertexInterp2(isoValue, v[3], v[0], field[3], field[0], vertlist[3], normlist[3]);

       vertexInterp2(isoValue, v[4], v[5], field[4], field[5], vertlist[4], normlist[4]);
       vertexInterp2(isoValue, v[5], v[6], field[5], field[6], vertlist[5], normlist[5]);
       vertexInterp2(isoValue, v[6], v[7], field[6], field[7], vertlist[6], normlist[6]);
       vertexInterp2(isoValue, v[7], v[4], field[7], field[4], vertlist[7], normlist[7]);

       vertexInterp2(isoValue, v[0], v[4], field[0], field[4], vertlist[8], normlist[8]);
       vertexInterp2(isoValue, v[1], v[5], field[1], field[5], vertlist[9], normlist[9]);
       vertexInterp2(isoValue, v[2], v[6], field[2], field[6], vertlist[10], normlist[10]);
       vertexInterp2(isoValue, v[3], v[7], field[3], field[7], vertlist[11], normlist[11]);

       uint numVerts = tex1Dfeth<uint>(numVertsTex, cubeindex);

       for (int i = 0; i < numVerts; i++) {
           uint edge = tex1Dfetch<uint>(triTex, cubeindex * 16 + i);
           uint index = numVertsScanned[voxel] + i;

           if (index < maxVerts) {
               pos[index] = make_float4(vertlist[edge], 1.0f);
               norm[index] = make_float4(normlist[edge], 0.0f);
           }
       }
   }

   extern "C" void launch_generateTriangles(sycl::range<3> grid, sycl::range<3> threads, float4 *pos, float4 *norm,
                                            uint *compactedVoxelArray, uint *numVertsScanned, sycl::uint3 gridSize,
                                            sycl::uint3 gridSizeShift, sycl::uint3 gridSizeMask, sycl::float3 voxelSize,
                                            float isoValue, uint activeVoxels, uint maxVerts) {

       dpct::get_in_order_queue().submit([&](sycl::handler &cgh) {
           auto triTex_acc = static_cast<dpct::image_wrapper<
               dpct_placeholder /* Fix this manually */, 1> *>(triTex) -> get_access(cgh);
           auto numVertsTex_acc = static_cast<dpct::image_wrapper<
               dpct_placeholder /* Fix this manually */, 1> *>(numVertsTex) -> get_access(cgh);

           auto triTex_smpl = triTex -> get_sampler();
           auto numVertsTex_smpl = numVertsTex -> get_sampler();

           cgh.parallel_for(sycl::nd_range<3>(grid * threads, threads), [=](sycl::nd_item<3> item_ct1) {
               generateTriangles(
                   pos, norm, compactedVoxelArray, numVertsScanned, gridSize, gridSizeShift, gridSizeMask,
                   voxelSize, isoValue, activeVoxels, maxVerts,
                   dpct::image_accessor_ext<dpct_placeholder /* Fix this manually */, 1>(triTex_smpl, triTex_acc),
                   dpct::image_accessor_ext<dpct_placeholder /* Fix this manually */, 1>(
                       numVertsTex_smpl, numVertsTex_acc),
                   item_ct1);
           });
       });

       getLastCudaError("generateTriangles failed");
   }

In SYCL, the logi of the kernel remains the same, but the API calls and
syntax are changed to be compatible with the SYCL framework. The use of
``dpct::image_accessor_ext`` for texture accesses and ``sycl::nd_item``
for thread and block indices are notable chagnes. (MORE ON THIS SECTION
LATER)

Use of Thrust Library in CUDA Implementation:
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Understanding Prefix Sum Operations**

Beofre diving into how the Thrust library is used in the CUDA
implementation, it is essential to understand what prefix sum operations
are and why they are crucial in parallel algorithms.

**What is a Prefix Sum?**

A prefix sum, also known as a scan operation, is an operation that takes
an input array and produces an output array were each element at index
``i`` is the sum of all the elements from the start of the input array
up to, but not including, the element at index ``i``. In mathematical
terms, given an input array ``A``, the prefix sum array ``B`` is defined
as:

.. math:: B[i] = \sum_{j=0}^{i} A[j]

For example, if the input array ``A`` is:

.. math:: A=[3,1,4,1,5,9,2,6,5]

then the prefix sum array ``B`` would be:

.. math:: B=[0,3,4,8,9,14,23,25,31]

Here, ``B[0]`` is 0 because there are no elements before the first
element of ``A``, ``B[1]`` is 3 which is just ``A[0]``, ``B[2]`` is 4
which is ``A[0] + A[1]``, and so on.

Prefix sums are a fundamental building block in parallel algorithms.
They are used in a variety of applications such as stream compaction,
sorting, and building data structures like histograms and cumulative
distributions. The prefix sum operation is inherently parallelizable
because each element in the output array can be computed independently
once the partial sums are known.

In our marching cubes algorithm, the prefix sum operation is used to
compact the voxel array. After classifying the voxels, we need to know
how many voxels are occupied up to each point in the array to
efficiently generate the triangles. This is where the prefix sum comes
into play.

After classifying each voxel as occupied or empty, we have an array
``voxelOccupied`` where each element is a flag indicating whether a
voxel is occupied. We need to compact this array to remove the empty
voxels and create a contiguous array of occupied voxels. The prerfix sum
operation on the ``voxelOccupied`` array allows us to achieve this.

Using the prefix sum operation on the ``voxelOccupied`` array results in
the ``voxelOccupiedScan`` array. This array contains the running total
of occupied voxels up to each point. By using this array, we can
determine the position of each occupied voxel in the compacted array.

**Using Thrust in the CUDA Implementation**

Thrust is a parlalel algorithms library in CUDA that resembes the C++
Standard Template Library (STL). It provides a collection of data
parallel primitives such as scan, sort, and reduce. Thrust is highly
optimized for performance on NVIDIA GPUs by taking advanatge of CUDA
underneath the hood.

The ``ThrustScanWrapper`` function encapsulates the Thrust scan
operation - remember, scan is just another name for prefix sum. It uses
the ``thrust::exclusize_scan`` function to compute the prefix sum.

.. code:: cpp

   extern "C" void ThrustScanWrapper(unsigned int *output, unsigned int *input, unsigned int numElements) {
       thrust::exclusive_scan(thrust::device_ptr<unsigned int>(input),
                              thrust::device_ptr<unsigned int>(input + numElements),
                              thrust::device_ptr<unsigned int>(output));
   }

The ``thrust::exclusize_scan`` function takes three parameters: the
beginning of the input range, the end of the input range, and the
beginning of the output range. It computes the prefix sum of the input
range and stores the result in the output range. The exclusive scan
means that the sum at each position does not include the element at that
position, which aligns with the traditional definition of prefix sums.

In the ``computeIsosurface`` function, after classifying the voxels, a
scan operation is performed on the ``voxelOccupied`` array. Remember,
this array contains flags indicating whether each voxel is occupied. The
scan operation computes the prefix sum of this array, which results in
the ``voxelOccupiedScan`` array, which tells us how many occupied voxels
there are up to each position.

.. code:: cpp

   ThrustScanWrapper(d_voxelOccupiedScan, d_voxelOccupied, numVoxels);

Thre prefix sum operation is crucial for the compaction step. It allows
us to create a compact array of occupied voxels, eliminating the empty
ones. This compact array is then used in the ``generateTriangles``
kernel to efficiently generate the triangles for the isosurface.

Use oneDPL (Thrust Equivalent) in SYCL:
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

oneDPL (oneAPI DPC++ Library) serves as the SYCL equivalent to CUDA’s
Thrust library. Both libraries offer high-level abstractions for
parallel algorithms and data structures. In our marching cubes
algorithms, oneDPL can be used to perform the prefix sum (scan)
oeprations, which, we know from above, are crucial for stream compaction
and calculating the number of vertices.

The ``dpct::device_ext::exclusive_scan`` function is used to perform the
prefix sum operation in SYCL. SYCLomatic helps convert Thrust-based code
to oneDPL-based code, although, just as with our kernels, some manual
adjustments may be required.

For example, the converted prefix sum operation using oneDPL might look
like this:

.. code:: cpp

   #include <oneapi/dpl/execution>
   #include <oneapi/dpl/algorithm>

   void oneDPLScanWrapper(unsigned int *output, unsigned int *input, unsigned int numElements, sycl::queue &q) {
       oneapi::dpl::execution::make_device_policy(q),
       oneapi::dpl::exclusive_scan(oneapi::dpl::execution::make_device_policy(q),
                                   input, input + numElements, output);
   }

In this example, ``oneapi::dpl::exclusive_scan`` performs the exclusive
prefix sum operation, similar to Thrust. The
``oneapi::dpl::execution::make_device_policy`` function creates a device
policy for the queue, ensuring that the operation is execued on the
appropirate device.

(EDIT THIS SECTION AFTER IMPLEMENTATION)
