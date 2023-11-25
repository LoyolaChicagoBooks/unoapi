Modern C++ as a Better C (and C++)
==================================

If you want to learn SYCL and oneAPI *properly*, you will need to come up to speed with Modern C++.  In our experience, we know many people--including ourselves--who say they "know" C++.  C++ has undergone numerous changes since it was introduced in the 1980s and 1990s.  While the original syntax remains intact, if you have not kept up with the changes since then (notably, C++ 11), you should take steps to refresh your knowlege of the language, since many of its recent features make it virtually *unrecognizable* from its earlier incarnations.

We are particularly impressed with how C++ has incorporated features from modern object-functional languages, some of which we will cover here.  Please let us know if you think other features are worthy of inclusion. As this section is still in draft status, we realize our list may not be exhaustive.

In the remaining discussion, we focus our energy on on language features that are likely to appear in oneAPI/SYCL code examples in our tutorial.

Overview of Modern C++
-----------------------

If you already know some Object-Oriented Programming (OOP) concepts and want to learn modern C++, here are some topics that are worthy of exploration:

**Standard Library**: The C++ Standard Library provides a wide range of pre-built classes and functions that can be used to perform common tasks. You should learn about the different components of the Standard Library, such as containers, algorithms, and iterators, and how to use them effectively. We avoid using C-style pointer-based data structures in favor of STL classes. We also avoid external C++ data structures whenever the STL classes are most appropriate (and they often are).

**Templates**: Templates allow you to write generic code that works with any data type. This can save you a lot of time and effort by reducing code duplication. You should learn how to write function templates and class templates. Class templates are already well employed in STL. We often make use of function templates in our examples.

**Smart Pointers**: Smart pointers are a modern way of managing memory in C++. They automatically manage memory allocation and deallocation, making it less prone to memory leaks and errors. You should learn about the different types of smart pointers, including `unique_ptr`, `shared_ptr`, and `weak_ptr`.

**Lambda expressions**: Lambda expressions provide a concise way to define anonymous functions, which are functions that have no name. You should learn how to write lambda expressions and how to use them with the Standard Library algorithms. Lambda functions are indispensable when it comes to learning oneAPI and SYCL programming.

**Move semantics**: Move semantics is a new feature introduced in C++11 that allows you to transfer the resources of an object to another object. This can lead to more efficient code by avoiding unnecessary copying of objects. You should learn about r-value references, move constructors, and move assignment operators. Move smeantics should be used whenever large (and deep) data structures are involved.

**Threading**: Threading allows you to run multiple tasks concurrently. You should learn about the different threading constructs provided by the Standard Library, such as threads, mutexes, and condition variables. Keep in mind, of course, that oneAPI/SYCL are an *alternative* to threading and also allow for code ot be written without assuming a particular threading model.

**Modern C++ features**: C++ has been evolving rapidly in recent years, and new features are being added all the time. You should learn about modern C++ features such as `auto`, `constexpr`, `consteval`, and `module`, which can help you write more efficient and maintainable code. We greatly value software engineering, so all of these modern features will help to write *clean code*, especially when used judiciously.

**Exception handling**: Exception handling allows you to handle runtime errors in a structured way. You should learn about the try-catch blocks and how to throw and catch exceptions. (That said, we try to avoid them in our tutorial in favor of the systems tradition of using error codes whenever possible.)

**Ranges**: Ranges in C++ are a new library feature introduced in C++20 that provide a unified and composable way to work with sequences of values, including arrays, containers, and generators. Ranges allow you to express operations on sequences as composable, functional transformations, and can greatly simplify and improve the readability of code that works with sequences.

These topics will allow you to become proficient in modern C++ programming and write efficient, maintainable, and scalable code.

Language Features
------------------

The Modern C++ Class
^^^^^^^^^^^^^^^^^^^^^

Even if you programmed with C++ in the past, you need to understand that C++ has changed a great deal since its debut in the late-1980s and early 1990s.

Here's an example implementation of the familiar Point class with ``x``, ``y``, and ``z`` parameters in modern C++ with support for move semantics:

You can assume that this code can be placed in a C++ header file (e.g. Point.h) as a header-only solution:

.. literalinclude:: ../../examples/modern-cpp-examples/modern-cpp/point.h
   :language: cpp

In this implementation, the ``Point`` class has three private data members ``x_``, ``y_``, and ``z_``, representing the coordinates of the point. The class also provides a default constructor and a constructor that takes the ``x``, ``y``, and ``z`` values as parameters.

The class also demonstrates the concept of *move semantics* by providing a constructor and move assignment operators. The move constructor takes an r-value reference to another ``Point`` object, exchanges its data members with the current object using ``std::exchange``, and sets the exchanged data members to zero. The move assignment operator works similarly to the move constructor, but it returns a reference to the current object.

Finally, the class provides accessors for the ``x``, ``y``, and ``z`` values, which return the corresponding private data members.

Let's take a look at how to *use* this class:

.. literalinclude:: ../../examples/modern-cpp-examples/modern-cpp/point-demo.cpp
   :language: cpp

Move Semantics
^^^^^^^^^^^^^^

So it is natural to wonder: What does ``std::move()`` actually do?

``std::move()`` is a C++ Standard Library function defined in the ``<utility>`` header file. It is used to cast an l-value reference to an r-value reference, which enables move semantics.

When an object is moved (using move semantics), its resources (such as dynamically allocated memory) are transferred to the new object instead of being copied. This can lead to more efficient code by avoiding unnecessary copying of objects.

Here's an example of how to use ``std::move()`` to enable move semantics:


.. literalinclude:: ../../examples/modern-cpp-examples/modern-cpp/move-mvp.cpp
   :language: cpp


In this example, we define a class ``MyClass`` that has a default constructor, a destructor, and move semantics enabled through the move constructor and move assignment operator.

We then create an object a of ``MyClass``. We move ``a`` to create a new object ``b`` using ``std::move(a)``. We then move ``b`` to create a new object ``c`` using ``std::move(b)``.

In the move constructor and move assignment operator, we use ``std::move()`` to cast the l-value reference to other to an r-value reference, enabling move semantics. This allows us to transfer the resources of the original object to the new object, instead of copying them.

Note that ``std::move`` does not actually move anything by itself; it simply enables move semantics by casting an l-value reference to an r-value reference. It is up to the move constructor or move assignment operator to actually perform the move operation.

Lambda Expressions
^^^^^^^^^^^^^^^^^^^

Lambda expressions in C++ allow you to define anonymous functions directly within your code. 
Readers familiar with lambda expressions from other functional or object/functional languages should note that C++ lambda functions differ, fundamentally, in how they manage *closures* and, in particular, how and whether variables from the enclosing scope can be accessed and or modified.

Basic Lambda with No Parameters
"""""""""""""""""""""""""""""""""""

In the following example, ``sayHello`` is a lambda function with no parameters, and when we call it, it will print "Hello from lambda!".

.. literalinclude:: ../../examples/modern-cpp-examples/modern-cpp/lambda-no-parameters.cpp
   :language: cpp

Lambda with Parameters
""""""""""""""""""""""""""

In the following example, the ``add`` lambda takes two integer parameters and returns their sum.

.. literalinclude:: ../../examples/modern-cpp-examples/modern-cpp/lambda-with-parameters.cpp
   :language: cpp

Lambda with Explicit Return Type
""""""""""""""""""""""""""""""""""""

And in the following, The ``divide`` lambda has an explicit return type of ``double``.

.. literalinclude:: ../../examples/modern-cpp-examples/modern-cpp/lambda-with-return-type.cpp
   :language: cpp

Lambda with Closures
""""""""""""""""""""""""""""""""""""

Closures allow lambdas to capture variables from their enclosing scope.

The following shows how to capture variables by value:

.. literalinclude:: ../../examples/modern-cpp-examples/modern-cpp/lambda-with-closures-byval.cpp
   :language: cpp

Here, ``a`` and ``b`` are captured by value. That is, they can be read but not modified.

The following, however, shows apture by reference:

.. literalinclude:: ../../examples/modern-cpp-examples/modern-cpp/lambda-with-closures-byref.cpp
   :language: cpp


``a`` is captured by reference in the ``incrementA`` lambda.

Having to capture variables, individually, is not practical when there are more than a couple of variables needed by the lambda function. All variables can be captured by value:

.. literalinclude:: ../../examples/modern-cpp-examples/modern-cpp/lambda-with-closures-byval-all.cpp
   :language: cpp

And the following shows how to Capture everything by reference (use with caution):

.. literalinclude:: ../../examples/modern-cpp-examples/modern-cpp/lambda-with-closures-byref-all.cpp
   :language: cpp

These are foundational examples of lambdas and closures in C++. Lambdas can be even more versatile with features like mutable lambdas and complex capture rules.


Naming Conventions
^^^^^^^^^^^^^^^^^^^

What naming convention uses _ at the end of member variable names?

The convention of using an underscore at the end of member variable names is often used to distinguish them from other identifiers in the code, such as local variables or function parameters. This convention is often referred to as "trailing underscore" or "trailing underscore convention".

It is important to note that this naming convention is not part of the C++ language standard, and different coding styles or organizations may have different conventions for naming member variables. Some coding standards discourage the use of trailing underscores altogether, as they can make the code less readable and harder to maintain.

In general, it is a good practice to follow the naming conventions established by the coding style used in your project or organization, or to adopt a widely recognized naming convention such as the Google C++ Style Guide or the LLVM Coding Standards.


A possibility for avoiding underscore is to reorganize the member variables with a struct. The struct is a lightweight to create a value object in C++.

.. literalinclude:: ../../examples/modern-cpp-examples/modern-cpp/point-struct.h
   :language: cpp


Adding this to a CMake folder
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Here is how put the `Point` class (header) in a Cmake project with a folder named point_example and a cmake rule to build it:

.. code-block:: cmake

   cmake_minimum_required(VERSION 3.5)
   
   project(point_example)
   
   # Create a library for the Point class
   add_library(Point INTERFACE)
   target_include_directories(Point INTERFACE ${CMAKE_CURRENT_SOURCE_DIR})
   
   # Create an executable for the point_example
   add_executable(point_example main.cpp)
   
   # Link the Point library to the point_example executable
   target_link_libraries(point_example PRIVATE Point)
   

In this CMakeLists.txt file, we first set the minimum required version of CMake to 3.5, which is the version that introduced the `target_include_directories` command.

We then create a library for the `Point` class using the `add_library` command with the `INTERFACE` option. The `INTERFACE` option specifies that the library does not have an implementation file, and its headers should be made available to other targets that depend on it. We use the `target_include_directories` command to add the current source directory to the include paths of the `Point` library.

We then create an executable for the point_example using the add_executable command with the source file `main.cpp`. We use the `target_link_libraries` command to link the `Point` library to the `point_example` executable.

To use this `CMakeLists.txt` file, you would create a folder named `point_example` in your project directory, and place the `Point.h` header file and the `main.cpp` source file in that folder.


Automatic variables
^^^^^^^^^^^^^^^^^^^^^^^^

The auto keyword was introduced in C++11 as part of the language's support for type inference.
auto is used to declare a variable whose type is automatically inferred from its initializer (the right hand side of the assignment).
auto can simplify the syntax of variable declarations and make code more concise and readable.
auto is especially useful when working with complex or nested types that may be difficult to express explicitly in code.
In our book, SYCL/oneAPI code is greatly simplified by not having to write the actual data type over and over again.
Code that uses auto is more resilient to changes, since the type of a variable can be changed without needing to update the code that uses it, subject to the compiler checking it, of course.
auto is a useful feature that can simplify code, improve readability, and reduce the likelihood of type errors.

The following shows how auto can be used to initialize some variables of primitive types, e.g. int, double, float, bool, and char.
We also demonstrate how to initialize more complex structures such as an STL generic type (class).

.. literalinclude:: ../../examples/modern-cpp-examples/modern-cpp/auto-mva2.cpp
   :language: cpp


Constants and Constant Expressions
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

In this example, we define a pythagorean function using constexpr and lambda expressions.
The function takes two arguments a and b representing the lengths of the two sides of a right-angled triangle, and calculates the length of the hypotenuse using the Pythagorean theorem.

We then define two const variables a and b, which have values of 3.0 and 4.0 respectively. Since a and b are const, we cannot change their values once they have been initialized.

Finally, we initialize a constexpr variable c with the value of pythagorean(a, b). Since a, b, and pythagorean are all const or constexpr, we can evaluate pythagorean(a, b) at compile-time and use it to initialize c.

Using lambda functions is another way to achieve compile-time computations and can simplify the structure for certain operations.

Below is an implementation that uses a lambda function to compute the square root at compile time:

The program then prints the length of the hypotenuse to the console using std::cout.

Overall, this example demonstrates how you can use const and constexpr together to define constants and perform compile-time evaluations of functions, even for more complex calculations such as the Pythagorean theorem.

.. literalinclude:: ../../examples/modern-cpp-examples/modern-cpp/const-constexpr.cpp
   :language: cpp



initializer expressions
^^^^^^^^^^^^^^^^^^^^^^^^

Initializer expressions are a modern C++ feature that is powerful when combined with `auto`.
You'll probably find yourself making greater use of them, even when initializing the simplest of variables.
We rely on these extensively in our C++ examples throughout this book.

In this version of the code, we use initializer expressions for each variable declaration.
The syntax for an initializer expression is {} or = {}, and it can be used to initialize a variable with an explicit value.

.. code-block:: cpp

   #include <iostream>
   #include <vector>
   #include <list>
   #include <map>
   #include <set>
   #include <string>
   #include <fmt/core.h>
   
   int main() {
       auto i{42};
       auto d1{1.23}, d2{4.56};
       auto f1{0.123f}, f2{6.789f};
       auto b1{true}, b2{false};
       auto c1{'c'}, c2{'d'};
   
       auto v1{std::vector<int>{1, 2, 3, 4, 5}};
       auto l1{std::list<double>{d1, d2, d1, d2, d1}};
       auto m1{std::map<float, bool>{{f1, b1}, {f2, b2}, {f1, b2}}};
       auto s1{std::set<char>{c1, c2, c1, c2}};
       auto str1{std::string{"Hello, world!"}};
   
       fmt::print("i = {}\n", i);
       fmt::print("d1 = {}\n", d1);
       fmt::print("d2 = {}\n", d2);
       fmt::print("f1 = {}\n", f1);
       fmt::print("f2 = {}\n", f2);
       fmt::print("b1 = {}\n", b1);
       fmt::print("b2 = {}\n", b2);
       fmt::print("c1 = '{}'\n", c1);
       fmt::print("c2 = '{}'\n", c2);
       fmt::print("v1 = {}\n", fmt::join(v1, ", "));
       fmt::print("l1 = {}\n", fmt::join(l1, ", "));
       fmt::print("m1 = {{{}, {}}}\n", m1.begin()->first, m1.begin()->second);
       fmt::print("s1 = {{{}}}\n", fmt::join(s1, ", "));
       fmt::print("str1 = \"{}\"\n", str1);
   
       return 0;
   }

Using initializer expressions can make the code more concise and improve readability, since each variable is initialized with an explicit value. Additionally, initializer expressions can help prevent bugs caused by uninitialized variables, since each variable is guaranteed to have a value at the point of initialization.

Overall, using initializer expressions is a good practice in C++ programming, and can help make code more concise, readable, and robust.

Format and fmt
^^^^^^^^^^^^^^^^^

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


Command-line Argument Handling
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

It is virtually impossible to do any sort of scaling experiments in parallel computing withou making your applications *parametric*. The Unix tradition is built around the command line as a user interface.
To this end, thinking about how to make a command-line interface without the drudgery of writing your own command line parser from scratch is essential to making command-line applications and interfaces.

The following shows how to use the well-established CLI11 framework.
An flag-style argument is created for each data type with a default value that will be set, if not present on the command line.

.. code-block:: cpp

   #include <iostream>
   #include <string>
   #include "CLI/CLI.hpp"
   #include "fmt/format.h"
   
   int main(int argc, char* argv[]) {
       CLI::App app{"Command-line interface example"};
   
       // Add arguments for each built-in data type
       int i = 42;
       app.add_option("-i,--int", i, "Integer argument");
   
       double d = 3.14;
       app.add_option("-d,--double", d, "Double argument");
   
       float f = 2.71;
       app.add_option("-f,--float", f, "Float argument");
   
       bool b = true;
       app.add_flag("-b,--bool", b, "Boolean argument");
   
       std::string s = "Hello, world!";
       app.add_option("-s,--string", s, "String argument");
   
       // Parse the command-line arguments
       CLI11_PARSE(app, argc, argv);
   
       // Print the parsed arguments
       fmt::print("Parsed arguments:\n");
       fmt::print("  int: {}\n", i);
       fmt::print("  double: {}\n", d);
       fmt::print("  float: {}\n", f);
       fmt::print("  bool: {}\n", b);
       fmt::print("  string: {}\n", s);
   
       return 0;
   }
   

In this example, we create a CLI::App object to represent our command-line interface. We then add an argument for each built-in data type using the CLI::App::add_option() and CLI::App::add_flag() functions. Each argument has a default value that is appropriate for that type.

We then parse the command-line arguments using the CLI11_PARSE macro, which takes the CLI::App object, the argc and argv arguments from the main() function, and parses the arguments.

Finally, we print the parsed arguments using the fmt::print() function from the fmt library. The fmt::print() function takes a format string and any number of arguments, and prints the formatted string to the console. In this example, we use the {} format specifier to insert the values of the parsed arguments into the format string.

Overall, this example demonstrates how you can create a command-line interface with arguments that support each of the built-in data types using the CLI11 package and the fmt library, and how you can print the parsed arguments using the fmt library's fmt::print() function.


To use the above code, you'll need to add the following to your CMakeLists.txt file:

.. code-block:: cmake

   cmake_minimum_required(VERSION 3.16)
   
   project(CommandLineInterfaceExample)
   
   include(FetchContent)
   
   # Download and configure the CLI11 library
   FetchContent_Declare(
       cli11
       GIT_REPOSITORY https://github.com/CLIUtils/CLI11.git
       GIT_TAG v1.9.1
   )
   FetchContent_MakeAvailable(cli11)
   
   # Download and configure the fmt library
   FetchContent_Declare(
       fmt
       GIT_REPOSITORY https://github.com/fmtlib/fmt.git
       GIT_TAG 8.1.0
   )
   FetchContent_MakeAvailable(fmt)
   
   add_executable(CommandLineInterfaceExample main.cpp)
   target_link_libraries(CommandLineInterfaceExample PRIVATE CLI11::CLI11 fmt::fmt)
   

Better Generics for Mathematical Functions
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

In the following  example, we define a minimum function that takes two generic input parameters `x` and `y` of type `T`. We use `std::enable_if` with the condition `std::is_arithmetic<T>::value` to enable the function only for arithmetic types (i.e., integer and floating point types).

The second template parameter is a default value for a pointer type that is enabled only when the first condition is met. The default value is set to `nullptr` to allow the function to have a return type, even when `std::enable_if` disables the function.

.. note:: This is known as a "substitution failure is not an error" technique.

Inside the function, we use the ternary operator to return the smaller of the two input parameters `x` and `y`.

This minimum function can be used with any integer or floating point type, including int, double, float, long, long long, etc.

.. code-block:: cpp

   #include <type_traits>
   
   template<typename T, typename std::enable_if<std::is_arithmetic<T>::value, T>::type* = nullptr>
   T minimum(T x, T y) {
       return x < y ? x : y;
   }
   

Logging
^^^^^^^^

The use of named logging levels can be traced back to the early days of UNIX, specifically to the syslog system, which was first introduced in the 1970s.
Syslog was a logging mechanism that allowed different programs to send log messages to a central system log, which could then be analyzed and monitored by system administrators.
Syslog introduced the concept of different logging levels, which were initially represented as numeric values from 0 to 7, with 0 being the most severe and 7 being the least severe.
Over time, these numeric values were replaced by named levels, which were easier to read and understand.
The tradition of using named logging levels has since been adopted by many logging frameworks and libraries, and is now a standard convention in the field of software engineering.

One of the most popular logging frameworks for C++ is called "spdlog", which stands for "super fast C++ logging library".
It is an open-source, header-only library that provides fast and flexible logging capabilities for C++ applications.
It supports various logging backends, such as console, file, and syslog, and provides features such as log rotation, thread-safety, and customizable formatting.
Spdlog has gained popularity in the C++ community due to its ease of use, performance, and compatibility with other libraries and frameworks.

The common logging levels, in increasing order of severity, are:

- **TRACE**: Fine-grained informational events that are most useful to debug an application.

- **DEBUG**: Detailed debug information that can be useful to diagnose an application.

- **INFO**: Informational messages that highlight the progress of the application at a high level.

- **WARN**: Potentially harmful situations or unexpected events that do not prevent the application from working, but might require attention.

- **ERROR**: Error events that might still allow the application to continue running.

- **FATAL**: Severe error events that might cause the application to terminate.

The following code shows how to use the logging levels in **spdlog**.
By default, a message is sent to *all* of the logging levels.
You can override the message by using one of the levels, e.g. ``--debug "This is some debug text."``
In addition, you can specify the default level to show. In this case, the default level is set to "info" (corresponding to **INFO** above).
Only log messages written to this level or higher will actulaly be displayed.

.. code-block:: cpp

   #include <iostream>
   #include <string>
   #include "CLI/CLI.hpp"
   #include "spdlog/spdlog.h"
   
   int main(int argc, char** argv) {
   
       CLI::App app("CLI11 Logging Example");
       
       std::string trace_message;
       std::string debug_message;
       std::string info_message;
       std::string warn_message;
       std::string error_message;
       std::string fatal_message;
       
       // add options for each logging level
       app.add_option("--trace", trace_message, "Log a trace message");
       app.add_option("--debug", debug_message, "Log a debug message");
       app.add_option("--info", info_message, "Log an info message");
       app.add_option("--warn", warn_message, "Log a warn message");
       app.add_option("--error", error_message, "Log an error message");
       app.add_option("--fatal", fatal_message, "Log a fatal message");
   
       // add option to set the log level
       std::vector<std::string> allowed_log_levels = {"trace", "debug", "info", "warn", "error", "fatal"};
       std::string log_level = "info";
       app.add_option("--log-level", log_level, "Set the log level")->check(CLI::IsMember(allowed_log_levels))->default_val(log_level);
   
       // parse the command line arguments
       CLI11_PARSE(app, argc, argv);
   
       // configure the logger
       auto logger = spdlog::stdout_color_mt("console");
       logger->set_level(spdlog::level::from_str(log_level));
   
       // log the message at the appropriate level
       if (!trace_message.empty()) {
           SPDLOG_TRACE(logger, trace_message);
       }
       if (!debug_message.empty()) {
           SPDLOG_DEBUG(logger, debug_message);
       }
       if (!info_message.empty()) {
           SPDLOG_INFO(logger, info_message);
       }
       if (!warn_message.empty()) {
           SPDLOG_WARN(logger, warn_message);
       }
       if (!error_message.empty()) {
           SPDLOG_ERROR(logger, error_message);
       }
       if (!fatal_message.empty()) {
           SPDLOG_CRITICAL(logger, fatal_message);
       }
   
       return 0;
   }
   
   
Essential Template Classes in STL
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
The C++ Standard Template Library (STL) is a powerful (and comprehensive) set of template classes and functions, providing common data structures and algorithms. The STL is an integral part of the C++ Standard Library. 

Let's start with the most commonly needed ``std::vector`` and ``std::map``.

``std::vector``: The Standard All-in-One Vector Type
""""""""""""""""""""""""""""""""""""""""""""""""""""""""

`std::vector` is a dynamic all-in-one array data structure in C++ (similar to a Python list) that provides efficient memory management and flexible storage of elements, and it is important in scientific computing for its ability to handle large amounts of data efficiently.

Using `std::vector` is preferable to using a C pointer based equivalent array because it provides automatic memory management, better safety and convenience, and improved performance for dynamic resizing and storage of elements.

The advantages of using `std::vector` therefore outweigh any disadvantages, especially if you care about the balance of performance and safety as we do.

The top 10 operations include:

- `push_back()`: This function adds an element to the end of the vector.
 
- `pop_back()`: This function removes the last element from the vector.
 
- `size()`: This function returns the current number of elements in the vector.
 
- `resize()`: This function resizes the vector to the specified number of elements. If the new size is larger than the current size, new elements are added with their default values. If the new size is smaller than the current size, excess elements are removed.
 
- `clear()`: This function removes all elements from the vector.
 
- `empty()`: This function returns true if the vector is empty, i.e., if it has no elements.
 
- `reserve()`: This function reserves space in the vector for a certain number of elements. This can be useful when you know the approximate size of the vector in advance and want to avoid frequent reallocations.
 
- `begin()` and end(): These functions return iterators that point to the first and one-past-the-last elements of the vector, respectively. You can use these iterators to traverse the elements of the vector.
 
- `at()`: This function provides bounds checking when accessing elements of the vector. It throws an exception if the index is out of range.
 
- `operator[]`: This function provides direct access to the elements of the vector using the square bracket notation. It does not perform bounds checking, so you need to be careful not to access elements out of range.
 

In the following exmaple, we demonsrate the use of these most popular methods and use simple print statements to show that each method works as expected.

We make use of the built-in support for random number generation. Uniform random numbers are generated between 0.0 and 1.0.

.. code-block:: cpp

   #include <iostream>
   #include <vector>
   #include <random>
   #include <fmt/core.h>
   
   int main() {
       std::random_device rd;
       std::mt19937 gen(rd());
       std::uniform_real_distribution<double> dist(0.0, 1.0);
   
       std::vector<double> v;
   
       // push_back()
       for (int i = 0; i < 10; i++) {
           v.push_back(dist(gen));
       }
   
       // size()
       fmt::print("size: {}\n", v.size());
   
       // resize()
       v.resize(5, 0.0);
       fmt::print("size after resize: {}\n", v.size());
   
       // reserve()
       v.reserve(20);
       fmt::print("capacity after reserve: {}\n", v.capacity());
   
       // clear()
       v.clear();
       fmt::print("size after clear: {}\n", v.size());
   
       // empty()
       fmt::print("vector is {}\n", v.empty() ? "empty" : "not empty");
   
       // pop_back()
       for (int i = 0; i < 10; i++) {
           v.push_back(dist(gen));
       }
       v.pop_back();
   
       // at()
       fmt::print("first element: {}\n", v.at(0));
       fmt::print("last element: {}\n", v.at(v.size()-1));
   
       // operator[]
       v[0] = dist(gen);
       v[1] = dist(gen);
       v[2] = dist(gen);
       fmt::print("first element: {}\n", v[0]);
       fmt::print("last element: {}\n", v[v.size()-1]);
   
       // iterators
       for (auto it = v.begin(); it != v.end(); it++) {
           fmt::print("{} ", *it);
       }
       fmt::print("\n");
   
       return 0;
   }
   
Your output may look like the following:

::

   size: 10
   size after resize: 5
   capacity after reserve: 20
   size after clear: 0
   vector is empty
   first element: 0.492471
   last element: 0.557134
   first element: 0.958176
   last element: 0.557134
   0.958176 0.334128 0.031727 0.228955 0.983797 0.0328053 0.788841 0.462369 0.557134


Testing using "print" statements is not ideal. Here is how to rewrite the above using unit tests:

.. code-block:: cpp

   #include <gtest/gtest.h>
   #include <vector>
   #include <random>
   
   TEST(VectorTest, PushBack) {
       std::vector<double> v;
       v.push_back(1.2);
       v.push_back(3.4);
       v.push_back(5.6);
       ASSERT_EQ(3, v.size());
   }
   
   TEST(VectorTest, Size) {
       std::vector<double> v;
       v.push_back(1.2);
       v.push_back(3.4);
       v.push_back(5.6);
       ASSERT_EQ(3, v.size());
   }
   
   TEST(VectorTest, Empty) {
       std::vector<double> v;
       ASSERT_TRUE(v.empty());
       v.push_back(1.2);
       ASSERT_FALSE(v.empty());
   }
   
   TEST(VectorTest, Index) {
       std::vector<double> v;
       v.push_back(1.2);
       v.push_back(3.4);
       v.push_back(5.6);
       ASSERT_EQ(3.4, v[1]);
   }

   TEST(VectorTest, At) {
       std::vector<double> v;
       v.push_back(1.2);
       v.push_back(3.4);
       v.push_back(5.6);
       ASSERT_EQ(5.6, v.at(2));
       ASSERT_THROW(v.at(3), std::out_of_range);
   }

   TEST(VectorTest, Iterator) {
       std::vector<double> v;
       v.push_back(1.2);
       v.push_back(3.4);
       v.push_back(5.6);
       int count = 0;
       for (auto it = v.begin(); it != v.end(); it++) {
           if (*it == 3.4) {
               ASSERT_EQ(1, count);
           }
           count++;
       }
       ASSERT_EQ(3, count);
   }
   
   TEST(VectorTest, Resize) {
       std::vector<double> v;
       v.push_back(1.2);
       v.push_back(3.4);
       v.push_back(5.6);
       v.resize(5);
       ASSERT_EQ(5, v.size());
       ASSERT_EQ(0, v[3]);
   }
   
   TEST(VectorTest, PopBack) {
       std::vector<double> v;
       v.push_back(1.2);
       v.push_back(3.4);
       v.push_back(5.6);
       v.pop_back();
       ASSERT_EQ(2, v.size());
       ASSERT_EQ(3.4, v.back());
   }
   
   TEST(VectorTest, Shuffle) {
       std::vector<double> v;
       std::random_device rd;
       std::mt19937 g(rd());
       for (int i = 1; i <= 10; i++) {
           v.push_back(i);
       }
       std::shuffle(v.begin(), v.end(), g);
       ASSERT_NE(1.0, v[0]);
   }
   
   
``std::map``: The Standard All-in-One Associative Array/Dictionary Type
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

``std::map`` is a dynamic all-in-one array data structure in C++ (similar to a Python dictionary) that supports an associative array, where keys of any type can be mapped to values of any type.

Here are the top 10 most common std::map methods and a brief explanation of their functionality:

- `insert()`: Inserts an element into the map with the specified key-value pair.
- `size()`: Returns the number of elements in the map.
- `empty()`: Checks whether the map is empty.
- `find()`: Searches the map for an element with the specified key and returns an iterator to it, or returns end() if not found.
- `operator[]`: Accesses the element with the specified key, or inserts a new element with the default value if not found.
- `erase()`: Removes an element from the map with the specified key.
- `count()`: Counts the number of elements in the map with the specified key.
- `clear()`: Removes all elements from the map.
- `begin()`: Returns an iterator to the first element in the map.
- `end()`: Returns an iterator past the last element in the map.

These methods provide essential functionality for managing key-value pairs in a map, and are widely used in various domains of programming, such as data processing, game development, and system programming, among others.

In the following exmaple, we demonsrate the use of these most popular methods and use simple print statements to show that each method works as expected.

We make use of the built-in support for random number generation. Uniform random numbers are generated between 0.0 and 1.0.

.. code-block:: cpp

   #include <iostream>
   #include <map>
   #include <random>
   
   int main() {
       std::random_device rd;
       std::mt19937 gen(rd());
       std::uniform_int_distribution<int> dist(1, 100);
   
       std::map<std::string, int> m;
   
       // insert
       m.insert(std::make_pair("one", dist(gen)));
       m.insert(std::make_pair("two", dist(gen)));
       m.insert(std::make_pair("three", dist(gen)));
   
       // size
       std::cout << "size: " << m.size() << std::endl;
   
       // empty
       std::cout << "map is " << (m.empty() ? "empty" : "not empty") << std::endl;
   
       // find
       auto it = m.find("two");
       if (it != m.end()) {
           std::cout << "value of key 'two': " << it->second << std::endl;
       } else {
           std::cout << "key 'two' not found" << std::endl;
       }
   
       // operator[]
       std::cout << "value of key 'three': " << m["three"] << std::endl;
   
       // erase
       m.erase("one");
   
       // count
       int n = m.count("one");
       std::cout << "count of key 'one': " << n << std::endl;
   
       // clear
       m.clear();
       std::cout << "size after clear: " << m.size() << std::endl;
   
       // iteration
       m.insert(std::make_pair("one", dist(gen)));
       m.insert(std::make_pair("two", dist(gen)));
       m.insert(std::make_pair("three", dist(gen)));
       for (auto it = m.begin(); it != m.end(); it++) {
           std::cout << it->first << " => " << it->second << std::endl;
       }
   
       return 0;
   }
   
Your output may look like the following:
   
::

   size: 3
   map is not empty
   value of key 'two': 78
   value of key 'three': 34
   count of key 'one': 0
   size after clear: 0
   one => 3
   three => 75
   two => 37

Testing using "print" statements is not ideal. Here is how to rewrite the above using unit tests:

.. code-block:: cpp

   #include <gtest/gtest.h>
   #include <map>
   
   TEST(MapTest, Insert) {
       std::map<std::string, int> m;
       m.insert(std::make_pair("one", 1));
       m.insert(std::make_pair("two", 2));
       m.insert(std::make_pair("three", 3));
       ASSERT_EQ(3, m.size());
   }
   
   TEST(MapTest, Size) {
       std::map<std::string, int> m;
       m.insert(std::make_pair("one", 1));
       m.insert(std::make_pair("two", 2));
       m.insert(std::make_pair("three", 3));
       ASSERT_EQ(3, m.size());
   }
   
   TEST(MapTest, Empty) {
       std::map<std::string, int> m;
       ASSERT_TRUE(m.empty());
       m.insert(std::make_pair("one", 1));
       ASSERT_FALSE(m.empty());
   }
   
   TEST(MapTest, Find) {
       std::map<std::string, int> m;
       m.insert(std::make_pair("one", 1));
       m.insert(std::make_pair("two", 2));
       m.insert(std::make_pair("three", 3));
       auto it = m.find("two");
       ASSERT_NE(m.end(), it);
       ASSERT_EQ(2, it->second);
   }
   
   TEST(MapTest, Operator) {
       std::map<std::string, int> m;
       m.insert(std::make_pair("one", 1));
       m.insert(std::make_pair("two", 2));
       m.insert(std::make_pair("three", 3));
       ASSERT_EQ(3, m["three"]);
       ASSERT_EQ(4, m["four"]);
       ASSERT_EQ(4, m.size());
   }
   
   TEST(MapTest, Erase) {
       std::map<std::string, int> m;
       m.insert(std::make_pair("one", 1));
       m.insert(std::make_pair("two", 2));
       m.insert(std::make_pair("three", 3));
       m.erase("one");
       ASSERT_EQ(2, m.size());
       ASSERT_EQ(0, m.count("one"));
   }
   
   TEST(MapTest, Count) {
       std::map<std::string, int> m;
       m.insert(std::make_pair("one", 1));
       m.insert(std::make_pair("two", 2));
       m.insert(std::make_pair("three", 3));
       ASSERT_EQ(1, m.count("two"));
       ASSERT_EQ(0, m.count("four"));
   }
   
   TEST(MapTest, Clear) {
       std::map<std::string, int> m;
       m.insert(std::make_pair("one", 1));
       m.insert(std::make_pair("two", 2));
       m.insert(std::make_pair("three", 3));
       m.clear();
       ASSERT_EQ(0, m.size());
       ASSERT_TRUE(m.empty());
   }
   
   TEST(MapTest, Iteration) {
       std::map<std::string, int> m;
       m.insert(std::make_pair("one", 1));
       m.insert(std::make_pair("two", 2));
       m.insert(std::make_pair("three", 3));
       int count = 0;
       for (auto it = m.begin(); it != m.end(); it++) {
           if (it->first == "one") {
               ASSERT_EQ(1, it->second);
           } else if (it->first == "two") {
               ASSERT_EQ(2, it->second);
           }
           else if (it->first == "three") {
               ASSERT_EQ(3, it->second);
           }
           count++;
       }
       ASSERT_EQ(3, count);
   }

Other Useful Template Classes beyond ``std::vector`` and ``std::map``
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

There are several other essential modern template classes in the STL that are highly useful for various programming tasks. Many of these are useful to advanced systems programming, so we will introduce them briefly here and provide examples of each that are appropriate for our tutorial.

- **`std::array`**: A container that encapsulates fixed-size arrays. It offers similar functionality to plain arrays but with added benefits of standard container functions like `.size()` and iterators.

- **`std::deque`**: Double-ended queue that allows insertion and deletion at both ends. It's useful when you need dynamic array behavior but with efficient insertion/removal from the front and back.

- **`std::list`** and **`std::forward_list`**: Implementations of doubly-linked and singly-linked lists, respectively. They offer constant time insertion and deletion of elements but do not provide random access.

- **`std::set`** and **`std::multiset`**: Containers that store unique elements following a specific order. `std::multiset` differs in allowing multiple elements to have equivalent values.

- **`std::unordered_set`** and **`std::unordered_multiset`**: Implementations of hash set and multiset. They provide faster lookup, insertion, and deletion compared to `std::set`/`std::multiset` at the cost of not maintaining order.

- **`std::stack`** and **`std::queue`**: Adaptor containers. `std::stack` provides LIFO (last-in, first-out) data structure, and `std::queue` offers FIFO (first-in, first-out) data structure.

- **`std::priority_queue`**: A container adaptor that provides constant time lookup of the largest (or smallest, if you customize) element.

- **`std::map`** and **`std::multimap`**: Associative containers that store elements formed by a combination of a key value and a mapped value, following a specific order. The `std::multimap` allows multiple entries for a single key.

- **`std::unordered_map`** and **`std::unordered_multimap`**: Implementations of hash map and hash multimap. They allow for faster access than `std::map`/`std::multimap` but do not keep elements in any specific order.

- **`std::optional`**: A wrapper for values that may or may not be present. Introduced in C++17, it's useful for functions that may or may not return a value in a safe manner.

- **`std::variant`**: Also introduced in C++17, this is a type-safe union class, which can hold one of several specified types but only one at a time.

- **`std::tuple`**: A fixed-size collection of heterogeneous values. It's a generalization of `std::pair`.

- **`std::function`**: A general-purpose polymorphic function wrapper. It can store, move, and invoke any Callable target—functions, lambda expressions, bind expressions, or other function objects.

- **`std::thread`**: Represents a single thread of execution and introduced in C++11. It allows for more straightforward and portable multithreading.

- **`std::future`** and **`std::promise`**: Introduced in C++11, these classes are used for asynchronous programming. They provide mechanisms to access the result of asynchronous operations.

Understanding and effectively using these template classes can significantly enhance the efficiency, reliability, and readability of your C++ code. Each of these classes serves a particular purpose and can be chosen based on the specific requirements of your program.
   
``std::array``
""""""""""""""""

This example demonstrates the basics of working with ``std::array``. 
It also demonstrates how to initialize it with an underlying pointer to an array.

.. code-block:: cpp

    #include <array>
    #include <iostream>

    int main() {
        int rawArray[3] = {1, 2, 3};
        std::array<int, 3> arr = {1, 2, 3};

        std::cout << "First element: " << arr.front() << "\n";
        std::cout << "Last element: " << arr.back() << "\n";
        arr.fill(5); // Fill array with 5
        for (auto& e : arr) std::cout << e << " "; // This uses a range expression on the underlying array
        std::cout << "\nSize: " << arr.size() << "\n"; 
    }

``std::deque``
""""""""""""""""""

A *deque* is a doubly-ended queue data structure.
It assures excellent performance when retrieving items from either side of th deque.

The following show how to insert items at either end and remove items from either end.
It also shows how to iterate the contents of the deque in natural order.

.. code-block:: cpp

    #include <deque>
    #include <iostream>

    int main() {
        std::deque<int> dq = {2, 3, 4};

        dq.push_front(1);
        dq.push_back(5);
        std::cout << "Front: " << dq.front() << "\n";
        std::cout << "Back: " << dq.back() << "\n";
        
        dq.pop_front();
        dq.pop_back();

        for (auto& e : dq) std::cout << e << " ";
    }


Random Number Generation
^^^^^^^^^^^^^^^^^^^^^^^^^

Scientific computing depends on random number generation in many domains.
We use it in a number of our programming examples.

``std::mt19937`` is one of the many built-in random number generators provided by the C++ standard library. Here are some of the other commonly used random number generators in the standard library.

``std::default_random_engine``: This is a typedef that represents the default random number generator used by the standard library. Its exact implementation may vary between different implementations of the library.

``std::minstd_rand0``: This is a simple linear congruential generator with a short period. It's not recommended for serious use, but it's provided for backwards compatibility with older code. We do not recommend using this one unless you have really good reasons for doing so.

``std::minstd_rand``: This is a variant of std::minstd_rand0 with a longer period and better statistical properties.

``std::mersenne_twister_engine``: This is the same generator as std::mt19937, but with a larger state size and a longer period. It's generally considered to be one of the best random number generators available. This is what we use in our examples.

``std::ranlux24_base``, ``std::ranlux48_base``, ``std::ranlux24``, ``std::ranlux48``: These are a family of generators that use a lagged Fibonacci algorithm with a guaranteed long period. The 24 and 48 variants refer to the number of bits used for each number, and the _base variants use a simpler algorithm that's faster but has a shorter period.

Each of these generators has its own strengths and weaknesses, so the choice of which one to use will depend on the specific needs of your program.

The following is an example of how to use random number generation to generate Point instances in all quandrants. 
We use CLI11 to select the random number strategy.
We use lambda expressions to select points in each quadrant, subject to what the user specifies on the command line.

.. code-block:: cpp

   #include <iostream>
   #include <vector>
   #include <algorithm>
   #include <random>
   #include "point.h"
   #include "CLI11.hpp"
   
   // Define a helper function to filter the Points based on a predicate
   template<typename T, typename Predicate>
   std::vector<Point<T>> filterPoints(const std::vector<Point<T>>& points, Predicate pred) {
       std::vector<Point<T>> filteredPoints;
       std::copy_if(points.begin(), points.end(), std::back_inserter(filteredPoints), pred);
       return filteredPoints;
   }
   
   // Define a helper function to print the Points in a vector
   template<typename T>
   void printPoints(const std::vector<Point<T>>& points, const std::string& message) {
       std::cout << message << ":" << std::endl;
       for (const auto& p : points) {
           std::cout << "(" << p.getX() << ", " << p.getY() << ")" << std::endl;
       }
   }
   
   int main(int argc, char** argv) {
       // Define command line options for showing points in each quadrant.
       // An additional option, --rng, allows you to select the random number generator from two good choices.
       CLI::App app{"Quadrant filter"};
       std::size_t numPoints = 10;
       app.add_option("-n,--num-points", numPoints, "Number of random points to generate");
       bool showUpperRight = false;
       bool showUpperLeft = false;
       bool showLowerRight = false;
       bool showLowerLeft = false;
       app.add_flag("-ur,--upper-right", showUpperRight, "Show points in upper right quadrant");
       app.add_flag("-ul,--upper-left", showUpperLeft, "Show points in upper left quadrant");
       app.add_flag("-lr,--lower-right", showLowerRight, "Show points in lower right quadrant");
       app.add_flag("-ll,--lower-left", showLowerLeft, "Show points in lower left quadrant");
       std::string rngName = "mt19937";
       app.add_option("--rng", rngName, "Random number generator to use (mt19937 or minstd_rand)")->check([](const std::string& name) {
           return (name == "mt19937" || name == "minstd_rand") ? "" : "Invalid random number generator";
       });
       CLI11_PARSE(app, argc, argv);
   
       // Generate a random number of Points with double coordinates
       // Note that randFunc is set to the random number generator selected, allowing us to switch the random number 
       // generator easily. Others can be added without having to do major code changes.
       std::vector<Point<double>> points;
       std::random_device rd;
       std::function<double()> randFunc;
       if (rngName == "minstd_rand") {
           std::minstd_rand gen(rd());
           std::uniform_real_distribution<double> dis(-10.0, 10.0);
           randFunc = std::bind(dis, gen);
       } else {
           std::mt19937 gen(rd());
           std::uniform_real_distribution<double> dis(-10.0, 10.0);
           randFunc = std::bind(dis, gen);
       }
       for (std::size_t i = 0; i < numPoints; ++i) {
           points.emplace_back(randFunc(), randFunc());
       }
   
       // Filter the Points that are in each quadrant using lambda expressions and helper functions

       if (showUpperRight) {
           auto isUpperRight = [](const Point<double>& p) {
               return p.getX() >= 0.0 && p.getY() >= 0.0;
           };
           auto upperRightPoints = filterPoints(points, isUpperRight);
           printPoints(upperRightPoints, "Points in upper right quadrant");
       }
   
       if (showUpperLeft) {
           auto isUpperLeft = [](const Point<double>& p) {
               return p.getX() < 0.0 && p.getY() >= 0.0;
           };
           auto upperLeftPoints = filterPoints(points, isUpperLeft);
           printPoints(upperLeftPoints, "Points in upper left quadrant");
       }
   
       if (showLowerRight) {
           auto isLowerRight = [](const Point<double>& p) {
               return p.getX() >= 0.0 && p.getY() < 0.0;
           };
           auto lowerRightPoints = filterPoints(points, isLowerRight);
           printPoints(lowerRightPoints, "Points in lower right quadrant");
       }
   
       if (showLowerLeft) {
           auto isLowerLeft = [](const Point<double>& p) {
               return p.getX() < 0.0 && p.getY() < 0.0;
           };
           auto lowerLeftPoints = filterPoints(points, isLowerLeft);
           printPoints(lowerLeftPoints, "Points in lower left quadrant");
       }
   
       return 0;
   }
   

Ranges
^^^^^^^^^^^^^^^

In this example, we use the ``std::views::iota`` function to create a range of integers from 1 to 10. We then use a range-based for loop to iterate over the range and print each value.

.. code-block:: cpp

   #include <iostream>
   #include <ranges>
   
   int main() {
       auto my_range = std::views::iota(1, 11);
   
       for (int i : my_range) {
           std::cout << i << " ";
       }
       std::cout << std::endl;
   
       return 0;
   }


Ranges do not use any storage in the sense that they do not create a container to hold the elements of the range. Instead, ranges are defined as a pair of iterators or as a view that transforms or filters elements from an existing range.

Ranges operate lazily, which means that they do not compute the elements of the range until they are actually needed. This can make ranges more efficient than containers for certain operations, because the elements are computed on-the-fly rather than being stored in memory.

However, some range operations may require temporary storage to hold intermediate results or to cache the elements of the range. In such cases, the range may allocate memory to store these temporary results, but this is typically done behind the scenes and is not visible to the user.

In this example, we use the ``std::views::filter`` function to create a new view that filters the original range to include only the even numbers. We then use a range-based for loop to iterate over the filtered range and print each even number.

.. code-block:: cpp

   #include <iostream>
   #include <ranges>
   
   int main() {
       auto my_range = std::views::iota(1, 11);
   
       auto even_numbers = my_range | std::views::filter([](int x) { return x % 2 == 0; });
   
       for (int i : even_numbers) {
           std::cout << i << " ";
       }
       std::cout << std::endl;
   
       return 0;
   }

Ranges are still a work in progress in C++20, and support is inconsistent across compilers and operating systems.
Therefore, for more advanced, portable solutions, it is convenient to use the third-party library `Range-v3 <https://ericniebler.github.io/range-v3/>`_, which works with toolchains supporting C++14 and up and forms the basis for range support in C++20.

The following example is based on the `Advent of Code 2022 day one challenge <https://adventofcode.com/2022/day/1>`_.
To summarize briefly, the input file consists of zero or more blocks of positive numbers, each on a separate line, separated by blank lines.
The task is to determine the up to three largest blocks of numbers with respect to the sum of their numbers, and determine the grand total of those (up to three) sums.

In terms of the original AoC sample input,

.. code-block:: text

    1000
    2000
    3000 <- sum = 6000

    4000 <- sum = 4000

    5000
    6000 <- sum = 11000

    7000
    8000
    9000 <- sum = 24000

    10000 <- sum = 10000

the fourth, third, and fifth block would be the three largest, with sums of 24,000, 11,000, and 10,000, respectively, and total sum of 45,000.
The answer consists of the largest sum and the grand total the three largest sums, i.e., the pair of 24,000 and 45,000.

Here is a solution in C++20 using Range-v3.
The main program converts successive lines to a vector of numbers, using 0 to represent empty lines.

.. literalinclude:: ../../examples/modern-cpp-examples/modern-cpp/rangev3-aoc2022day1_main.cpp
   :language: cpp

The core logic groups the flat vector into chunks terminated by, but not including, zeroes and then filters out any leftover chunks containing a zero.
It then replaces each chunk with the sum of its values in the form of a flattened vector, and uses ``nth_element`` to partially sort the vector in descending order but only down to the first n (i.e., three) elements.

.. literalinclude:: ../../examples/modern-cpp-examples/modern-cpp/rangev3-aoc2022day1.cpp
   :language: cpp

Note that all lambdas involved in this example are pure in the sense that they aren't closures that capture anything from their environment.

To appreciate the strong influence functional languages have had on C++ ranges, let's take a look at a Scala 3 version of this example.
We first implement the extension method ``splitWhere``, similar to ``chunkBy`` but without having to filter, which we can then use in a very similar pipeline as above.
``toIndexedSeq`` is equivalent to ``to_vector``, and we are not aware of an efficient partial sorting method in Scala.

.. code-block:: scala

    /** Partitions an iterator into chunks of consecutive elements for which the predicate holds. */
    extension [A](it: Iterator[A])
        def splitWhere(p: A => Boolean) = Iterator
        .continually(it.takeWhile(p))
        .takeWhile(_ => it.hasNext)

    val input = scala.io.Source.stdin.getLines

    // iterate over inventories of consecutive nonempty lines
    // this stores only one Int per elf in memory
    val result = input
        .splitWhere(_.nonEmpty)
        .map(_.map(_.toInt).sum)
        .toIndexedSeq
        .sorted


.. Smart Pointers


.. Exception Handling


Threading
^^^^^^^^^^^^

Co-routines
^^^^^^^^^^^^

.. note:: Co-routines are a fairly new C++ feature and may not be supported by your compiler. This is not needed for our oneAPI tutorial.

Co-routines are an important concept that is relevant to our discussion of SYCL and oneAPI.

A coroutine is a allows for the execution of multiple, independent, and cooperative subroutines or functions that can be paused and resumed at certain points to enable asynchronous or concurrent programming, without the overhead of creating multiple threads or processes.

Historically, the concept of coroutines was first introduced in the programming language Simula 67 -- the language that introduced object-oriented programming -- developed by Ole-Johan Dahl and Kristen Nygaard at the Norwegian Computing Center in Oslo, Norway in the mid-1960s.
The implementation of coroutines in Simula 67 was a bit different from the modern concept of coroutines, and the term "coroutine" itself was not used at that time.
The first programming language to use the term "coroutine" and to implement coroutines in a way that is closer to the modern concept was the programming language Modula-2, developed by Niklaus Wirth in the late 1970s.
After Modula-2, the next programming language to introduce support for coroutines was Ada, which added support for coroutines in the Ada 95 version of the language.

.. code-block:: ada

   with Ada.Text_IO; use Ada.Text_IO;
   with Ada.Numerics.Float_Random; use Ada.Numerics.Float_Random;
   
   procedure Coroutine_Example is
   
      type Coroutine is access procedure; -- define a type for a coroutine
      
      task type Coroutine_Task is -- define a task type for a coroutine
         entry Start(C : in Coroutine); -- an entry to start the coroutine
      end Coroutine_Task;
   
      Sum : Float := 0.0; -- shared variable to accumulate the sum
      Num_Coroutines : constant Integer := 10; -- number of coroutines
      
      -- define the coroutine procedure
      procedure My_Coroutine is
         R : Float_Random.Generator; -- random number generator
         X : constant Float := Float_Random.Random(R); -- compute a random number
      begin
         Put_Line("Coroutine started, X = " & Float'Image(X));
         Sum := Sum + X; -- add X to the sum
      end My_Coroutine;
   
      -- array of coroutines
      Coroutines : array (1..Num_Coroutines) of Coroutine;
   
      -- array of coroutine tasks
      Tasks : array (1..Num_Coroutines) of Coroutine_Task;
   
   begin
   
      -- create the coroutines and their tasks
      for I in 1..Num_Coroutines loop
         Coroutines(I) := My_Coroutine'Access; -- create a coroutine
         Tasks(I) := new Coroutine_Task; -- create a task for the coroutine
         Tasks(I).Start(Coroutines(I)); -- start the task, passing the coroutine as parameter
      end loop;
   
      -- wait for all tasks to complete
      for I in 1..Num_Coroutines loop
         null;
      end loop;
   
      -- print the final result
      Put_Line("Sum = " & Float'Image(Sum));
   
   end Coroutine_Example;
   

Co-routines have become popular in many recent language designs, notably Go. Here is what a co-routine looks like in Go.

.. code-block:: go

   package main
   
   import (
       "fmt"
       "math/rand"
       "time"
   )
   
   func coroutine(ch chan<- float64) {
       r := rand.New(rand.NewSource(time.Now().UnixNano())) // create a random number generator
       x := r.Float64() // compute a random number
       fmt.Printf("Coroutine started, x = %f\n", x)
       ch <- x // send the result back to the main program
   }
   
   func main() {
       sum := 0.0 // shared variable to accumulate the sum
       numCoroutines := 10 // number of coroutines
       ch := make(chan float64) // create a channel for communication
   
       // start the coroutines
       for i := 0; i < numCoroutines; i++ {
           go coroutine(ch)
       }
   
       // wait for all coroutines to complete and accumulate the results
       for i := 0; i < numCoroutines; i++ {
           sum += <-ch
       }
   
       // print the final result
       fmt.Printf("Sum = %f\n", sum)
   }
   
While our course is about C++, it is important to realize that many modern C++ features are greatly influenced by the other modern languages (and forms of expression) around them.
The ability to write co-routines and use *blocking* channels to exchange results between the co-routine and the main program demonstrate a high level of awareness that allows programmers to express concurrency clearly and concisely.

Modern co-routines, therefore, allow not only for the expression of concurrency but also for the elegant transmission of data to and from the co-routine. There are some similarities with how SYCL supports these concepts using *accessors*. We'll speak to this again when introducing SYCL.
   
Let's take a look at how C++ introduces co-routines.
The following shows how to create four co-routines that sleep for random amounts of time and join at the end?

.. code-block:: cpp

   #include <iostream>
   #include <chrono>
   #include <random>
   #include <coroutine>
   #include <vector>
   
   // A simple coroutine that sleeps for a random amount of time
   // and returns the amount of time slept

   class SleepCoroutine {
   public:
       SleepCoroutine() = default;
   
       // The coroutine promise type
       struct promise_type {
           auto get_return_object() {
               return SleepCoroutine{handle_type::from_promise(*this)};
           }
           std::suspend_never initial_suspend() { return {}; }
           std::suspend_always final_suspend() noexcept { return {}; }
           void unhandled_exception() { std::terminate(); }
           void return_void() {}
       };
   
       // The coroutine handle type
       using handle_type = std::coroutine_handle<promise_type>;
   
       // The coroutine execution function
       void operator()() {
           // Generate a random sleep time
        std::random_device rd;
        std::mt19937 gen(rd());
        std::uniform_int_distribution<> distr(1000, 5000);
        int sleep_time = distr(gen);

        // Sleep for the random time
        std::this_thread::sleep_for(std::chrono::milliseconds(sleep_time));
       }
   
   private:
       SleepCoroutine(handle_type h) : handle(h) {}
       handle_type handle;
   };
   
   // A function that creates and runs four sleep coroutines
   void run_sleep_coroutines() {
       // Create a vector to hold the coroutines
       std::vector<SleepCoroutine::handle_type> coroutines;
   
       // Create and start the coroutines
       for (int i = 0; i < 4; i++) {
           coroutines.push_back(SleepCoroutine{}());
       }
   
       // Join the coroutines
       for (auto& coroutine : coroutines) {
           coroutine.resume();
           coroutine.destroy();
       }
   }

   // The main function
   int main() {
       run_sleep_coroutines();
       std::cout << "All coroutines joined." << std::endl;
       return 0;
   }


