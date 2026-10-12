
import struct


def decode_float32(value: float | int) -> dict:
    """Decode an IEEE 754 single-precision number."""

    if isinstance(value, bool) or not isinstance(
        value, (int, float)
    ):
        raise ValueError("Input must be a number.")

    try:
        packed = struct.pack(">f", value)
    except OverflowError as exc:
        raise ValueError(
            "Value is outside the float32 range."
        ) from exc

    integer_bits = int.from_bytes(packed, "big")
    binary = f"{integer_bits:032b}"

    sign_bits = binary[0]
    exponent_bits = binary[1:9]
    fraction_bits = binary[9:]

    sign = int(sign_bits, 2)
    exponent = int(exponent_bits, 2)
    fraction = int(fraction_bits, 2)

    if exponent == 0:
        if fraction == 0:
            classification = "zero"
            actual_exponent = None
        else:
            classification = "subnormal"
            actual_exponent = -126

    elif exponent == 255:
        classification = (
            "infinity" if fraction == 0 else "nan"
        )
        actual_exponent = None

    else:
        classification = "normal"
        actual_exponent = exponent - 127

    stored_value = struct.unpack(">f", packed)[0]

    return {
        "binary": binary,
        "sign": sign,
        "exponent_bits": exponent_bits,
        "fraction_bits": fraction_bits,
        "exponent_raw": exponent,
        "fraction_raw": fraction,
        "actual_exponent": actual_exponent,
        "classification": classification,
        "stored_value": stored_value,
    }
