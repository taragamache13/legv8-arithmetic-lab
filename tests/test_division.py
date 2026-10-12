
import pytest

from arithmetic_lab.division import divide_u64


@pytest.mark.parametrize(
    "dividend, divisor, quotient, remainder",
    [
        (13, 3, 4, 1),
        (20, 5, 4, 0),
        (7, 2, 3, 1),
        (0, 9, 0, 0),
        (9, 20, 0, 9),
        (2**64 - 1, 2, 2**63 - 1, 1),
    ],
)
def test_unsigned_division(
    dividend, divisor, quotient, remainder
):
    result = divide_u64(dividend, divisor)

    assert result["quotient"] == quotient
    assert result["remainder"] == remainder

    assert dividend == divisor * quotient + remainder
    assert 0 <= remainder < divisor


def test_division_trace():
    result = divide_u64(13, 3)

    assert len(result["steps"]) == 4

    assert [
        step["incoming_bit"] for step in result["steps"]
    ] == [1, 1, 0, 1]

    assert result["steps"][-1]["remainder"] == 1


def test_division_by_zero():
    with pytest.raises(ZeroDivisionError):
        divide_u64(13, 0)


@pytest.mark.parametrize(
    "dividend, divisor",
    [
        (-1, 3),
        (3, -1),
        (2**64, 2),
    ],
)
def test_invalid_inputs(dividend, divisor):
    with pytest.raises(ValueError):
        divide_u64(dividend, divisor)
