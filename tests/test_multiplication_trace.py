
import pytest

from arithmetic_lab.multiplication import multiply_unsigned
from arithmetic_lab.multiplication_trace import trace_multiplication


def test_trace_steps():
    steps = trace_multiplication(13, 5)

    assert len(steps) == 3
    assert [s["bit"] for s in steps] == [1, 0, 1]
    assert [s["added"] for s in steps] == [13, 0, 52]
    assert [s["total"] for s in steps] == [13, 13, 65]


@pytest.mark.parametrize(
    "a, b",
    [(13, 5), (8, 4), (0, 7), (9, 0)],
)
def test_trace_matches_multiplication(a, b):
    steps = trace_multiplication(a, b)

    result = steps[-1]["total"] if steps else 0

    assert result == multiply_unsigned(a, b)


def test_zero_multiplier():
    assert trace_multiplication(13, 0) == []


@pytest.mark.parametrize("a, b", [(-1, 5), (5, -1)])
def test_negative_inputs(a, b):
    with pytest.raises(ValueError):
        trace_multiplication(a, b)
