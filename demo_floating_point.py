
from arithmetic_lab.floating_point import decode_float32


def main():
    examples = [13.25, -2.5, 0.1, 0.0]

    for number in examples:
        result = decode_float32(number)

        print("\n" + "=" * 50)
        print(f"Original number: {number}")
        print(f"Sign bit: {result['sign']}")
        print(f"Exponent: {result['exponent_bits']}")
        print(f"Fraction: {result['fraction_bits']}")

        print(
            f"Actual exponent: "
            f"{result['actual_exponent']}"
        )

        print(
            f"Classification: "
            f"{result['classification']}"
        )

        print(
            f"Stored float32 value: "
            f"{result['stored_value']}"
        )


if __name__ == "__main__":
    main()
