
from arithmetic_lab.registers import (
    multiply_u64,
    format_binary_64,
)


def main():
    examples = [
        (13, 5),
        (2**32, 2**32),
    ]

    for a, b in examples:
        result = multiply_u64(a, b)

        print("\n" + "=" * 50)
        print(f"Multiplying {a} x {b}")
        print(f"Full result: {result['full_result']}")
        print(f"Lower 64 bits: {result['low']}")
        print(f"Upper 64 bits: {result['high']}")
        print(f"Exceeds 64 bits: {result['overflowed']}")

        print("\nBinary register:")
        print(format_binary_64(result["low"]))


if __name__ == "__main__":
    main()
