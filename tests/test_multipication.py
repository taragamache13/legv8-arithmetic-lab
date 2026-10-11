
import pytest

from arithmetic_lab.multiplication import multiply_unsigned


@pytest.mark.parametrize(
    "a, b, expected",
    [
        (13, 5, 65),
        (8, 4, 32),
        (0, 7, 0),
        (9, 0, 0),
        (3, 3, 9),
    ],
)
def test_multiplication(a, b, expected):
    assert multiply_unsigned(a, b) == expected


@pytest.mark.parametrize("a, b", [(-1, 5), (5, -1)])
def test_negative_inputs(a, b):
    with pytest.raises(ValueError):
        multiply_unsigned(a, b)
