
import pytest

from arithmetic_lab.registers import (
    multiply_u64,
    format_binary_64,
)


@pytest.mark.parametrize(
    "a, b, low, high",
    [
        (13, 5, 65, 0),
        (0, 7, 0, 0),
        (2**32, 2**32, 0, 1),
        (2**64 - 1, 2, 2**64 - 2, 1),
    ],
)
def test_multiply_u64(a, b, low, high):
    result = multiply_u64(a, b)

    assert result["low"] == low
    assert result["high"] == high
    assert result["overflowed"] == (high != 0)


def test_binary_format():
    binary = format_binary_64(5)

    assert len(binary) == 64
    assert binary == "0" * 61 + "101"


@pytest.mark.parametrize(
    "a, b",
    [
        (-1, 2),
        (2**64, 1),
        (True, 2),
    ],
)
def test_invalid_inputs(a, b):
    with pytest.raises(ValueError):
        multiply_u64(a, b)
