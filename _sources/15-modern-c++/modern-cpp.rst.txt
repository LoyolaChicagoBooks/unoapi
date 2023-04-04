Modern C++ as a Better C (and C++)
==================================

Overview of Modern C++
-----------------------

If you already know some Object-Oriented Programming (OOP) concepts and want to learn modern C++, here are some topics that are worthy of exploration:

- **Standard Library**: The C++ Standard Library provides a wide range of pre-built classes and functions that can be used to perform common tasks. You should learn about the different components of the Standard Library, such as containers, algorithms, and iterators, and how to use them effectively. We avoid using C-style pointer-based data structures in favor of STL classes. We also avoid external C++ data structures whenever the STL classes are most appropriate (and they often are).

- **Templates**: Templates allow you to write generic code that works with any data type. This can save you a lot of time and effort by reducing code duplication. You should learn how to write function templates and class templates. Class templates are already well employed in STL. We often make use of function templates in our examples.

- **Smart Pointers**: Smart pointers are a modern way of managing memory in C++. They automatically manage memory allocation and deallocation, making it less prone to memory leaks and errors. You should learn about the different types of smart pointers, including `unique_ptr`, `shared_ptr`, and `weak_ptr`.

- **Lambda expressions**: Lambda expressions provide a concise way to define anonymous functions, which are functions that have no name. You should learn how to write lambda expressions and how to use them with the Standard Library algorithms. Lambda functions are indispensable when it comes to learning OneAPI and SYCL programming.

- **Move semantics**: Move semantics is a new feature introduced in C++11 that allows you to transfer the resources of an object to another object. This can lead to more efficient code by avoiding unnecessary copying of objects. You should learn about rvalue references, move constructors, and move assignment operators. Move smeantics should be used whenever large (and deep) data structures are involved.

- **Threading**: Threading allows you to run multiple tasks concurrently. You should learn about the different threading constructs provided by the Standard Library, such as threads, mutexes, and condition variables. Keep in mind, of course, that OneAPI/SYCL are an *alternative* to threading and also allow for code ot be written without assuming a particular threading model.

- **Modern C++ features**: C++ has been evolving rapidly in recent years, and new features are being added all the time. You should learn about modern C++ features such as `auto`, `constexpr`, `consteval`, and `module`, which can help you write more efficient and maintainable code. We greatly value software engineering, so all of these modern features will help to write *clean code*, especially when used judiciously.

- **Exception handling**: Exception handling allows you to handle runtime errors in a structured way. You should learn about the try-catch blocks and how to throw and catch exceptions. (That said, we try to avoid them in our tutorial in favor of the systems tradition of using error codes whenever possible.)


These topics will allow you to become proficient in modern C++ programming and write efficient, maintainable, and scalable code.

Language Features
------------------

The Modern C++ Class
^^^^^^^^^^^^^^^^^^^^^

Even if you programmed with C++ in the past, you need to understand that C++ has changed a great deal since its debut in the late-1980s and early 1990s.

Here's an example implementation of the familiar Point class with x, y, and z parameters in C++, supporting move semantics:

You can assume that this code can be placed in a C++ header file (e.g. Point.h):

.. code-block:: cpp

   class Point {
   public:
       Point(double x = 0.0, double y = 0.0, double z = 0.0)
           : x_{x}, y_{y}, z_{z} {}
   
       // Copy constructor
       Point(const Point& other)
           : x_{other.x_}, y_{other.y_}, z_{other.z_} {}
   
       // Move constructor
       Point(Point&& other) noexcept
           : x_{std::exchange(other.x_, 0.0)},
             y_{std::exchange(other.y_, 0.0)},
             z_{std::exchange(other.z_, 0.0)} {}
   
       // Copy assignment operator
       Point& operator=(const Point& other) {
           x_ = other.x_;
           y_ = other.y_;
           z_ = other.z_;
           return *this;
       }

       // Move assignment operator
       Point& operator=(Point&& other) noexcept {
           x_ = std::exchange(other.x_, 0.0);
           y_ = std::exchange(other.y_, 0.0);
           z_ = std::exchange(other.z_, 0.0);
           return *this;
       }
   
       // Accessors
       double x() const { return x_; }
       double y() const { return y_; }
       double z() const { return z_; }
   
   private:
       double x_, y_, z_;
   };


In this implementation, the `Point` class has three private data members `x_`, `y_`, and `z_`, representing the coordinates of the point. The class also provides a default constructor and a constructor that takes the `x`, `y`, and `z` values as parameters.

The class also supports the concept of *move semantics* by providing a constructor and move assignment operators. The move constructor takes an r-value reference to another `Point` object, exchanges its data members with the current object using `std::exchange`, and sets the exchanged data members to zero. The move assignment operator works similarly to the move constructor, but it returns a reference to the current object.

Finally, the class provides accessors for the `x`, `y`, and `z` values, which return the corresponding private data members.

Let's take a look at how to *use* this class:

.. code-block:: cpp

   #include <iostream>
   #include "Point.h"
   
   int main() {
       // Create a point object with x=1.0, y=2.0, z=3.0
       Point p1(1.0, 2.0, 3.0);
   
       // Copy the point object
       Point p2 = p1;
   
       // Move the point object
       Point p3 = std::move(p1);
   
       // Output the values of the point objects
       std::cout << "p1: (" << p1.x() << ", " << p1.y() << ", " << p1.z() << ")" << std::endl;
       std::cout << "p2: (" << p2.x() << ", " << p2.y() << ", " << p2.z() << ")" << std::endl;
       std::cout << "p3: (" << p3.x() << ", " << p3.y() << ", " << p3.z() << ")" << std::endl;
   
       // Update the values of the point objects
       p2 = Point(4.0, 5.0, 6.0);
       p3 = std::move(p2);
   
       // Output the updated values of the point objects
       std::cout << "p1: (" << p1.x() << ", " << p1.y() << ", " << p1.z() << ")" << std::endl;
       std::cout << "p2: (" << p2.x() << ", " << p2.y() << ", " << p2.z() << ")" << std::endl;
       std::cout << "p3: (" << p3.x() << ", " << p3.y() << ", " << p3.z() << ")" << std::endl;
   
       return 0;
   }
   


automatic variables

.. code-block:: cpp

   auto x = 25;

const and constexpr

.. code-block:: cpp


   constexpr size_t DEFAULT_NUMBER_OF_TRAPEZOIDS{1};

initializer expressions

.. code-block:: cpp

   bool show_function_values{false};
   bool run_sequentially{false};
   size_t number_of_trapezoids{DEFAULT_NUMBER_OF_TRAPEZOIDS};


Libraries
-----------

fmt
^^^

C++ 20 draft support for formatted strings (useful feature found in many modern languages, including Python).

Add this to your CMakeFile

.. code-block:: cmake

   FetchContent_Declare(
           fmt
           GIT_REPOSITORY https://github.com/fmtlib/fmt.git
           GIT_TAG        8.1.1
   )
   FetchContent_MakeAvailable(fmt)

Simple usage

.. code-block::cpp

   auto pi = 3.14159 // ish 
   fmt::print("pi = {}\n", pi);


command-line argument handling
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: cpp

   CLI::App app{"Monte Carlo algorithm for estimating pi"};
   app.add_option("-p,--players", number_of_players, "number of players");
   app.add_option("-n,--darts", number_of_darts, "number of darts per player");
   app.add_flag("-r,--randomize", randomize, "randomize dart locations");
   app.add_flag("-l,--ranlux", use_ranlux, "use ranlux instead of LCG (minstd) for random number generation");
   CLI11_PARSE(app, argc, argv);

logging - spdlog
^^^^^^^^^^^^^^^^^^

.. code-block:: cpp

   spdlog::info("{} players are going to throw {} darts each", number_of_players, number_of_darts);
   spdlog::info("using {} engine with real distribution", use_ranlux ? "ranlux" : "minstd");

