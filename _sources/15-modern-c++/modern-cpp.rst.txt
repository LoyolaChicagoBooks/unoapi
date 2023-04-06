Modern C++ as a Better C (and C++)
==================================

Overview of Modern C++
-----------------------

If you already know some Object-Oriented Programming (OOP) concepts and want to learn modern C++, here are some topics that are worthy of exploration:

- **Standard Library**: The C++ Standard Library provides a wide range of pre-built classes and functions that can be used to perform common tasks. You should learn about the different components of the Standard Library, such as containers, algorithms, and iterators, and how to use them effectively. We avoid using C-style pointer-based data structures in favor of STL classes. We also avoid external C++ data structures whenever the STL classes are most appropriate (and they often are).

- **Templates**: Templates allow you to write generic code that works with any data type. This can save you a lot of time and effort by reducing code duplication. You should learn how to write function templates and class templates. Class templates are already well employed in STL. We often make use of function templates in our examples.

- **Smart Pointers**: Smart pointers are a modern way of managing memory in C++. They automatically manage memory allocation and deallocation, making it less prone to memory leaks and errors. You should learn about the different types of smart pointers, including `unique_ptr`, `shared_ptr`, and `weak_ptr`.

- **Lambda expressions**: Lambda expressions provide a concise way to define anonymous functions, which are functions that have no name. You should learn how to write lambda expressions and how to use them with the Standard Library algorithms. Lambda functions are indispensable when it comes to learning OneAPI and SYCL programming.

- **Move semantics**: Move semantics is a new feature introduced in C++11 that allows you to transfer the resources of an object to another object. This can lead to more efficient code by avoiding unnecessary copying of objects. You should learn about r-value references, move constructors, and move assignment operators. Move smeantics should be used whenever large (and deep) data structures are involved.

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

   #ifndef POINT_H
   #define POINT_H

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
   #endif // POINT_H


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
   
Move Semantics
^^^^^^^^^^^^^^

So it is natural to wonder: What does std::move() actually do?

std::move is a C++ Standard Library function defined in the <utility> header. It is used to cast an l-value reference to an r-value reference, which enables move semantics.

When an object is moved (using move semantics), its resources (such as dynamically allocated memory) are transferred to the new object instead of being copied. This can lead to more efficient code by avoiding unnecessary copying of objects.

Here's an example of how to use std::move to enable move semantics:

.. code-block:: cpp

   #include <iostream>
   #include <utility>
   
   class MyClass {
   public:
       MyClass() {
           std::cout << "Default constructor" << std::endl;
           data_ = new int[10];
       }
   
       ~MyClass() {
           std::cout << "Destructor" << std::endl;
           delete[] data_;
       }
   
       // Move constructor
       MyClass(MyClass&& other) noexcept {
           std::cout << "Move constructor" << std::endl;
           data_ = other.data_;
           other.data_ = nullptr;
       }
   
       // Move assignment operator
       MyClass& operator=(MyClass&& other) noexcept {
           std::cout << "Move assignment operator" << std::endl;
           delete[] data_;
           data_ = other.data_;
           other.data_ = nullptr;
           return *this;
       }
   
   private:
       int* data_;
   };
   
   int main() {
       MyClass a;
       MyClass b(std::move(a)); // move a to b
       MyClass c = std::move(b); // move b to c
       return 0;
   }


In this example, we define a class `MyClass` that has a default constructor, a destructor, and move semantics enabled through the move constructor and move assignment operator.

We then create an object a of `MyClass`. We move `a` to create a new object `b` using `std::move(a)`. We then move `b` to create a new object `c` using `std::move(b)`.

In the move constructor and move assignment operator, we use `std::move` to cast the l-value reference to other to an r-value reference, enabling move semantics. This allows us to transfer the resources of the original object to the new object, instead of copying them.

Note that `std::move` does not actually move anything by itself; it simply enables move semantics by casting an l-value reference to an r-value reference. It is up to the move constructor or move assignment operator to actually perform the move operation.

Naming Conventions
^^^^^^^^^^^^^^^^^^^

What naming convention uses _ at the end of member variable names?

The convention of using an underscore at the end of member variable names is often used to distinguish them from other identifiers in the code, such as local variables or function parameters. This convention is often referred to as "trailing underscore" or "trailing underscore convention".

It is important to note that this naming convention is not part of the C++ language standard, and different coding styles or organizations may have different conventions for naming member variables. Some coding standards discourage the use of trailing underscores altogether, as they can make the code less readable and harder to maintain.

In general, it is a good practice to follow the naming conventions established by the coding style used in your project or organization, or to adopt a widely recognized naming convention such as the Google C++ Style Guide or the LLVM Coding Standards.


A possibility for avoiding underscore is to reorganize the member variables with a struct. The struct is a lightweight to create a value object in C++.

.. code-block:: cpp

   class Point {
   public:
       Point(double x = 0.0, double y = 0.0, double z = 0.0)
           : coords{x, y, z} {}
   
       // Copy constructor
       Point(const Point& other)
           : coords{other.coords} {}
   
       // Move constructor
       Point(Point&& other) noexcept
           : coords{std::move(other.coords)} {}
   
       // Copy assignment operator
       Point& operator=(const Point& other) {
           coords = other.coords;
           return *this;
       }
   
       // Move assignment operator
       Point& operator=(Point&& other) noexcept {
           coords = std::move(other.coords);
           return *this;
       }
   
       // Accessors
       double x() const { return coords.x; }
       double y() const { return coords.y; }
       double z() const { return coords.z; }
   
       // Scale the Point by a double factor
       void scale(double factor) {
           coords.x *= factor;
           coords.y *= factor;
           coords.z *= factor;
       }
   
       // Translate the Point by another Point
       void operator+=(const Point& other) {
           coords.x += other.coords.x;
           coords.y += other.coords.y;
           coords.z += other.coords.z;
       }
   
   private:
       struct Coords {
           double x, y, z;
       };
   
       Coords coords;
   };


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

.. note:: Working to put all of the above into a repo. Focusing on narrative first.


Co-routines
^^^^^^^^^^^^

.. note:: Co-routines are a fairly new C++ feature and may not be supported by your compiler.

Co-routines have become popular in many recent language designs, notably Go, but actually have a lineage at least dating to Hoare's Communicating Sequential Processes (CSP).
You can think of a co-routine as a run-to-completion thread.

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


Automatic variables
^^^^^^^^^^^^^^^^^^^^^^^^

The auto keyword was introduced in C++11 as part of the language's support for type inference.
auto is used to declare a variable whose type is automatically inferred from its initializer (the right hand side of the assignment).
auto can simplify the syntax of variable declarations and make code more concise and readable.
auto is especially useful when working with complex or nested types that may be difficult to express explicitly in code.
In our book, SYCL/OneAPI code is greatly simplified by not having to write the actual data type over and over again.
Code that uses auto is more resilient to changes, since the type of a variable can be changed without needing to update the code that uses it, subject to the compiler checking it, of course.
auto is a useful feature that can simplify code, improve readability, and reduce the likelihood of type errors.

The following shows how auto can be used to initialize some variables of primitive types, e.g. int, double, float, bool, and char.
We also demonstrate how to initialize more complex structures such as an STL generic type (class).

.. code-block:: cpp
   
   #include <iostream>
   #include <vector>
   #include <list>
   #include <map>
   #include <set>
   #include <string>
   #include <fmt/core.h>
   
   int main() {
       int i = 42;
       double d1 = 1.23, d2 = 4.56;
       float f1 = 0.123f, f2 = 6.789f;
       bool b1 = true, b2 = false;
       char c1 = 'c', c2 = 'd';
   
       auto v1 = std::vector<int>{1, 2, 3, 4, 5};
       auto l1 = std::list<double>{d1, d2, d1, d2, d1};
       auto m1 = std::map<float, bool>{{f1, b1}, {f2, b2}, {f1, b2}};
       auto s1 = std::set<char>{c1, c2, c1, c2};
       auto str1 = std::string{"Hello, world!"};
   
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

Constants and Constant Expressions
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

In this example, we define a pythagorean function using constexpr. The function takes two arguments a and b representing the lengths of the two sides of a right-angled triangle, and calculates the length of the hypotenuse using the Pythagorean theorem.

We then define two const variables a and b, which have values of 3.0 and 4.0 respectively. Since a and b are const, we cannot change their values once they have been initialized.

Finally, we initialize a constexpr variable c with the value of pythagorean(a, b). Since a, b, and pythagorean are all const or constexpr, we can evaluate pythagorean(a, b) at compile-time and use it to initialize c.

The program then prints the length of the hypotenuse to the console using std::cout.

Overall, this example demonstrates how you can use const and constexpr together to define constants and perform compile-time evaluations of functions, even for more complex calculations such as the Pythagorean theorem.

.. code-block:: cpp

   #include <iostream>
   #include <cmath>
   
   constexpr double pythagorean(double a, double b) {
       return std::sqrt(a * a + b * b);
   }
   
   int main() {
       const double a = 3.0;
       const double b = 4.0;
       constexpr double c = pythagorean(a, b);
   
       std::cout << "The hypotenuse is " << c << std::endl;
   
       return 0;
   }
   

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
   
   
Logging
^^^^^^^^

.. code-block:: cpp

   spdlog::info("{} players are going to throw {} darts each", number_of_players, number_of_darts);
   spdlog::info("using {} engine with real distribution", use_ranlux ? "ranlux" : "minstd");

