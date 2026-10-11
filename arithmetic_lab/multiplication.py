
def multiply_unsigned(a: int, b: int) -> int:
    """Multiply two nonnegative integers using binary shifts."""

    if not isinstance(a, int) or not isinstance(b, int):
        raise ValueError("Inputs must be integers.")

    if a < 0 or b < 0:
        raise ValueError("Inputs must be nonnegative.")

    result = 0

    while b > 0:
        if b & 1:
            result += a

        a <<= 1
        b >>= 1

    return result
