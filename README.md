
# LEGv8 Arithmetic Lab

[![CI](https://github.com/taragamache13/legv8-arithmetic-lab/actions/workflows/ci.yml/badge.svg)](https://github.com/taragamache13/legv8-arithmetic-lab/actions/workflows/ci.yml)

An interactive computer architecture learning application that explores binary arithmetic, register behavior, and IEEE 754 floating-point representation.

Built using Python, JavaScript, HTML, and CSS, this project combines arithmetic algorithms with interactive visualizations and automated testing.

**[Launch the Live Demo](https://taragamache13.github.io/legv8-arithmetic-lab/)**

## Project Overview

The LEGv8 Arithmetic Lab was developed while studying computer architecture and ARM/LEGv8 concepts.

The goal is to make low-level arithmetic easier to understand by visualizing the operations computers use to perform calculations.

The application includes three interactive simulators:

- IEEE 754 Floating-Point Visualizer
- Binary Multiplication Simulator
- Binary Division Simulator

The project also includes Python implementations of the underlying arithmetic algorithms and automated tests.

> **Note:** This is an ARM/LEGv8-inspired educational arithmetic application, not a complete LEGv8 processor emulator. It does not currently execute assembly instructions.

## Features

### IEEE 754 Floating-Point Visualizer

Explore how computers represent floating-point numbers.

Features include:

- Interactive 32-bit binary representation
- Clickable sign, exponent, and fraction bits
- Exponent bias calculations
- Step-by-step decimal reconstruction
- Comparison of 32-bit and 64-bit precision
- Visualization of floating-point rounding
- Handling of zero, subnormal values, and special encodings

Try entering `0.1` to explore why some decimal fractions cannot be represented exactly in binary.

### Binary Multiplication Simulator

Explore unsigned binary multiplication using shifts and addition.

Features include:

- Custom multiplicand and multiplier inputs
- Step-by-step execution tracing
- Binary shift-and-add calculations
- Running result visualization
- Previous Step, Next Step, Run All, and Reset controls
- Input validation

Example:

13 × 5 = 65

### Binary Division Simulator

Explore unsigned binary long division using shifts, comparisons, and subtraction.

Features include:

- Custom dividend and divisor inputs
- Step-by-step division execution
- Quotient and remainder tracking
- Interactive execution controls
- Division-by-zero validation
- Edge-case handling

Example:

13 ÷ 3 = 4 remainder 1

### Python Arithmetic Engine

The Python modules implement:

- Unsigned binary multiplication
- Step-by-step multiplication tracing
- 64-bit register multiplication behavior
- High and low multiplication result extraction
- Unsigned binary division
- Division execution tracing
- IEEE 754 single-precision decoding

## Technologies Used

| Technology | Purpose |
|---|---|
| Python | Arithmetic algorithms and simulation |
| JavaScript | Interactive browser functionality |
| HTML5 | Application structure |
| CSS3 | Responsive interface and styling |
| pytest | Python automated testing |
| Playwright | End-to-end browser testing |
| GitHub Actions | Continuous integration and deployment |
| GitHub Pages | Public website hosting |
| Git | Version control |

## Project Structure

```text
legv8-arithmetic-lab/
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── deploy.yml
├── arithmetic_lab/
│   ├── __init__.py
│   ├── division.py
│   ├── floating_point.py
│   ├── multiplication.py
│   ├── multiplication_trace.py
│   └── registers.py
├── browser-tests/
│   ├── division.spec.js
│   ├── floating-point.spec.js
│   └── multiplication.spec.js
├── tests/
├── web/
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── demo_division.py
├── demo_floating_point.py
├── demo_registers.py
├── demo_trace.py
├── playwright.config.js
├── package.json
└── README.md
```

## Running the Project Locally

### Requirements

- Python 3.14
- Node.js 24 and npm (for browser testing)
- Git
- A modern web browser

### Clone the Repository

```bash
git clone https://github.com/taragamache13/legv8-arithmetic-lab.git
cd legv8-arithmetic-lab
```

### Start the Website

```bash
python -m http.server 8000 --directory web
```

Open:

http://localhost:8000

The application runs locally without requiring a backend server beyond Python's static file server.

### Run Python Tests

Install pytest:

```bash
python -m pip install pytest
```

Run the test suite:

```bash
python -m pytest -v
```

### Run Playwright Browser Tests

Install JavaScript dependencies:

```bash
npm ci
```

Install the Chromium testing browser:

```bash
npx playwright install chromium
```

Run the browser tests:

```bash
npx playwright test --reporter=list
```

Playwright is configured to start the local web server automatically.

On Windows PowerShell, `npm.cmd` and `npx.cmd` can be used in place of `npm` and `npx`.

## Automated Testing

The project currently includes:

- **50 Python tests** covering arithmetic functions and edge cases
- **12 Playwright tests** covering interactive browser functionality

GitHub Actions automatically runs both test suites when changes are pushed.

A separate GitHub Actions workflow publishes the `web` directory to GitHub Pages.

## Computer Architecture Concepts

This project explores:

- Binary number representation
- Bit shifting and bitwise operations
- Unsigned integer arithmetic
- Multiplication using shifts and addition
- Division using shifts and subtraction
- Fixed-width register behavior
- Multiplication result truncation
- IEEE 754 floating-point encoding
- Floating-point precision and rounding

## Development Goals

Future improvements may include:

- Signed arithmetic simulations
- More detailed binary execution animations
- Additional register visualizations
- LEGv8 instruction interpretation
- Expanded automated test coverage
- Improved accessibility and mobile usability

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

## Live Application

**[Explore the LEGv8 Arithmetic Lab](https://taragamache13.github.io/legv8-arithmetic-lab/)**
