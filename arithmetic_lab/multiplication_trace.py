


def trace_multiplication(a: int, b: int) -> list[dict]:
    """Record each step of unsigned binary multiplication."""

    if not isinstance(a, int) or not isinstance(b, int):
        raise ValueError("Inputs must be integers.")

    if a < 0 or b < 0:
        raise ValueError("Inputs must be nonnegative.")

    steps = []
    result = 0
    step_number = 1

    while b > 0:
        bit = b & 1

        added = a if bit == 1 else 0
        result += added

        steps.append({
            "step": step_number,
            "multiplicand": a,
            "multiplier": b,
            "bit": bit,
            "added": added,
            "total": result,
        })

        a <<= 1
        b >>= 1
        step_number += 1

    return steps

    