
from arithmetic_lab.multiplication_trace import trace_multiplication
from arithmetic_lab.multiplication import multiply_unsigned


def main():
    a = 13
    b = 5

    print(f"\nBinary Multiplication: {a} x {b}")
    print("=" * 50)

    steps = trace_multiplication(a, b)

    for step in steps:
        print(f"\nStep {step['step']}")
        print(f"Multiplicand: {step['multiplicand']:b}")
        print(f"Multiplier:   {step['multiplier']:b}")
        print(f"Rightmost bit: {step['bit']}")
        print(f"Value added: {step['added']}")
        print(f"Running total: {step['total']}")

    print("\n" + "=" * 50)
    print(f"Final result: {multiply_unsigned(a, b)}")


if __name__ == "__main__":
    main()
