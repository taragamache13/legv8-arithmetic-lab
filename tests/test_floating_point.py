
import pytest

from arithmetic_lab.floating_point import decode_float32


@pytest.mark.parametrize(
    "value, sign, exponent, fraction",
    [
        (0.0, 0, 0, 0),
        (-0.0, 1, 0, 0),
        (1.0, 0, 127, 0),
        (-2.5, 1, 128, 1 << 21),
        (0.5, 0, 126, 0),
        (13.25, 0, 130, 21 << 18),
    ],
)
def test_float32_fields(
    value, sign, exponent, fraction
):
    result = decode_float32(value)

    assert len(result["binary"]) == 32
    assert result["sign"] == sign
    assert result["exponent_raw"] == exponent
    assert result["fraction_raw"] == fraction


@pytest.mark.parametrize(
    "value, expected",
    [
        (0.0, "zero"),
        (-0.0, "zero"),
        (1.0, "normal"),
        (2**-149, "subnormal"),
        (float("inf"), "infinity"),
        (float("nan"), "nan"),
    ],
)
def test_classification(value, expected):
    result = decode_float32(value)

    assert result["classification"] == expected


def test_decimal_rounding():
    result = decode_float32(0.1)

    assert result["stored_value"] != 0.1
    assert result["stored_value"] == pytest.approx(
        0.10000000149011612
    )


@pytest.mark.parametrize(
    "value",
    [True, "1.0", 1e40],
)
def test_invalid_inputs(value):
    with pytest.raises(ValueError):
        decode_float32(value)
