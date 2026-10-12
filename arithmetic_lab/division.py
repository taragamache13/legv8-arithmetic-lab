
from arithmetic_lab.registers import validate_u64


def divide_u64(dividend: int, divisor: int) -> dict:
    """Divide unsigned 64-bit integers using binary long division."""

    validate_u64(dividend)
    validate_u64(divisor)

    if divisor == 0:
        raise ZeroDivisionError("Cannot divide by zero.")

    quotient = 0
    remainder = 0
    steps = []

    for bit_index in range(
        max(1, dividend.bit_length()) - 1, -1, -1
    ):
        incoming_bit = (dividend >> bit_index) & 1

        remainder = (remainder << 1) | incoming_bit

        subtracted = remainder >= divisor

        if subtracted:
            remainder -= divisor
            quotient |= 1 << bit_index

        steps.append({
            "bit_position": bit_index,
            "incoming_bit": incoming_bit,
            "subtracted": subtracted,
            "remainder": remainder,
            "quotient": quotient,
        })

    return {
        "quotient": quotient,
        "remainder": remainder,
        "steps": steps,
    }
