
from arithmetic_lab.division import divide_u64


def main():
    dividend = 13
    divisor = 3

    result = divide_u64(dividend, divisor)

    print(f"\nDividing {dividend} by {divisor}")
    print("=" * 45)

    for number, step in enumerate(result["steps"], start=1):
        print(f"\nStep {number}")
        print(f"Incoming bit: {step['incoming_bit']}")
        print(f"Subtract divisor: {step['subtracted']}")
        print(f"Remainder: {step['remainder']}")
        print(f"Quotient so far: {step['quotient']}")

    print("\n" + "=" * 45)
    print(f"Final quotient: {result['quotient']}")
    print(f"Final remainder: {result['remainder']}")


if __name__ == "__main__":
    main()
