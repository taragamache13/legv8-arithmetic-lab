
from arithmetic_lab.multiplication import multiply_unsigned

WORD_SIZE = 64
MASK_64 = (1 << WORD_SIZE) - 1


def validate_u64(value: int) -> None:
    """Check that a value fits in an unsigned 64-bit register."""
    if type(value) is not int:
        raise ValueError("Value must be an integer.")

    if not 0 <= value <= MASK_64:
        raise ValueError("Value must fit in 64 bits.")


def format_binary_64(value: int) -> str:
    """Display a 64-bit register as binary."""
    validate_u64(value)
    return f"{value:064b}"


def multiply_u64(a: int, b: int) -> dict:
    """Multiply two unsigned 64-bit values."""
    validate_u64(a)
    validate_u64(b)

    full_result = multiply_unsigned(a, b)

    low = full_result & MASK_64
    high = full_result >> WORD_SIZE

    return {
        "full_result": full_result,
        "low": low,
        "high": high,
        "overflowed": high != 0,
    }
