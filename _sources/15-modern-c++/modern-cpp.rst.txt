Modern C++ as a Better C (and C++)
==================================

Language Features
------------------

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

.. code-block::

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

