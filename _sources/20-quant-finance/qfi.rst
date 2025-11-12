Quantitative Finance
======================

.. note:: Long-term analysis of financial/stock history is an interesting use case for high-performance computing. We are not here to offer financial advice but think this topic will motivate interest in HPC in general. If youare not interested in money/finance, please read our other chapters. LOL.

Understanding Stock Data
---------------------------

Stocks with the longest history of trading are typically those of companies that have been in existence for many decades, even centuries, and have been publicly traded for most of that time. Some of the oldest continuously operating and publicly traded companies in the United States are:

- **Consolidated Edison (Con Edison)**: Tracing its roots back to 1824, Con Edison, an energy company in New York, is often cited as one of the oldest publicly traded companies. It's been trading on the New York Stock Exchange (NYSE) for a very long time.

- **JPMorgan Chase & Co.**: With its earliest predecessor founded in 1799, JPMorgan Chase is one of the oldest and largest financial institutions in the United States. Its long history includes numerous mergers and acquisitions.

- **The Bank of New York Mellon Corporation (BNY Mellon)**: Founded in 1784 by Alexander Hamilton, BNY Mellon is one of America's oldest banks and has been traded publicly for many years.

- **Citigroup Inc.**: The origins of Citigroup can be traced back to the founding of the City Bank of New York in 1812. Over the years, it has grown and merged with other institutions.

- **The Coca-Cola Company**: Coca-Cola, founded in 1886, has a long history of public trade and is one of the most recognized brands globally.

- **Colgate-Palmolive**: Established in 1806, Colgate-Palmolive has been publicly traded for a significant part of its history, evolving from a starch, soap, and candle business into a global leader in consumer products.

- **Procter & Gamble (P&G)**: Founded in 1837, P&G has a long history in the consumer goods market and has been publicly traded for most of its history.

These companies not only have a long history of trading but also have been significant players in their respective industries for many years. The longevity of these companies makes their stock data particularly interesting for historical analysis, as they have weathered various economic cycles, technological changes, and market trends.

It's also noteworthy that the oldest listed company on a stock exchange is the Dutch East India Company, which issued the first shares on the Amsterdam Stock Exchange in the early 1600s. However, this company no longer exists. The historical significance of such early stock issuances paved the way for the modern stock trading system.

Fetching Stock Data Using C++
-----------------------------

To fetch stock data in C++, you can use libraries for HTTP requests and JSON parsing, as most stock data APIs provide data in JSON format.

Prerequisites
~~~~~~~~~~~~~

You'll need the following libraries:

- `CPR` for HTTP requests.
- `nlohmann/json` for parsing JSON data.
- `CLI11` for parsing command-line arguments.

These libraries can be integrated into your project using CMake's `FetchContent` module.

Fetching Data
~~~~~~~~~~~~~

1. **Choose a Stock Data API**: Select an API like Alpha Vantage, IEX Cloud, or Quandl. Note that most APIs require an API key.

2. **Set Up HTTP Client**: Use `CPR` to make HTTP requests to the chosen API.

3. **Parse JSON Data**: Utilize `nlohmann/json` to parse the JSON response from the API.

4. **Handle Command-Line Arguments**: Use `CLI11` to allow users to specify the API key, stock symbol, and other parameters via the command line.

Example Code
~~~~~~~~~~~~

Here's an example of how the main parts of your C++ code might look:

.. code-block:: cpp

    #include <cpr/cpr.h>
    #include <nlohmann/json.hpp>
    #include <CLI/CLI.hpp>
    #include <iostream>

    // Function to make API request and parse response
    nlohmann::json getStockData(const std::string& apiKey, const std::string& symbol) {
        std::string apiUrl = "https://api.example.com/stock/" + symbol + "/data?apikey=" + apiKey;
        auto response = cpr::Get(cpr::Url{apiUrl});
        return nlohmann::json::parse(response.text);
    }

    int main(int argc, char** argv) {
        CLI::App app{"Stock Data Fetcher"};
        std::string apiKey;
        std::string symbol;

        // Add command-line options
        // ...

        CLI11_PARSE(app, argc, argv);

        // Fetch and process stock data
        // ...
    }

Compilation and Execution
~~~~~~~~~~~~~~~~~~~~~~~~~

.. note:: Make specific to my example.

After setting up the `CMakeLists.txt` file, you can compile and run the program as follows:

.. code-block:: bash

    mkdir build
    cd build
    cmake ..
    make
    ./YourProgram --key YOUR_API_KEY --symbol STOCK_SYMBOL

Note that the actual API endpoint, request parameters, and response format will depend on the specific stock data API you choose to use.

.. _cpp_dependencies_setup:

Setting Up C++ Dependencies
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. note:: This shows how to add the C++ dependencies to `cmake`. I sm still determining whether we should use Python as a front-end/preprocessing step or not.

Use CMake's `FetchContent` module to integrate `CPR`, `nlohmann/json`, and `CLI11` into your project. Add the following to your `CMakeLists.txt`:

.. code-block:: cmake

    cmake_minimum_required(VERSION 3.14)  # Ensure you have at least CMake 3.14
    project(YourProjectName)

    # Include the FetchContent module
    include(FetchContent)

    # Fetch nlohmann/json
    FetchContent_Declare(
        json
        GIT_REPOSITORY https://github.com/nlohmann/json.git
        GIT_TAG v3.10.5  # Replace with the desired version
    )
    FetchContent_MakeAvailable(json) 

    # Fetch CPR
    FetchContent_Declare(
        cpr
        GIT_REPOSITORY https://github.com/whoshuu/cpr.git
        GIT_TAG 1.8.1  # Replace with the desired version
    )
    FetchContent_MakeAvailable(cpr)

    # Fetch CLI11
    FetchContent_Declare(
        CLI11
        GIT_REPOSITORY https://github.com/CLIUtils/CLI11.git
        GIT_TAG v2.2.0  # Replace with the desired version
    )
    FetchContent_MakeAvailable(CLI11)

    # Add your executable
    add_executable(${PROJECT_NAME} main.cpp)

    # Link libraries
    target_link_libraries(${PROJECT_NAME} PRIVATE nlohmann_json::nlohmann_json cpr::cpr CLI11::CLI11)

