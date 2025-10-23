import '@testing-library/jest-dom';
import { render, screen, act } from "@testing-library/react";
import Question from "../components/Question";

jest.useFakeTimers();

const testQuestion = "What's 2 + 2?";
const testAnswers = ["3", "4", "5"];
const noop = () => {};

test("decrements the timer by 1 every second", () => {
  render(<Question question={testQuestion} answers={testAnswers} onAnswered={noop} />);
  
  // Initial render
  expect(screen.getByText(/10 seconds remaining/)).toBeInTheDocument();

  act(() => {
    jest.advanceTimersByTime(1000); // 1s
  });
  // Re-query after act to ensure React flushed
  expect(screen.getByText(/9 seconds remaining/)).toBeInTheDocument();

  act(() => {
    jest.advanceTimersByTime(2000); // 2s
  });
  expect(screen.getByText(/7 seconds remaining/)).toBeInTheDocument();
});

test("calls onAnswered after 10 seconds", () => {
  const onAnswered = jest.fn();
  render(<Question question={testQuestion} answers={testAnswers} onAnswered={onAnswered} />);

  act(() => {
    jest.advanceTimersByTime(10000); // 10s
  });

  // Wrap in act again to flush state updates after interval callback
  act(() => {});
  
  expect(onAnswered).toHaveBeenCalledWith(false);
});
