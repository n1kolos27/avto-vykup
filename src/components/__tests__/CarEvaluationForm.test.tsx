import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CarEvaluationForm from '../CarEvaluationForm';

// Mock toast
vi.mock('../../lib/toast.js', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// Mock fetch
global.fetch = vi.fn();

describe('CarEvaluationForm Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (global.fetch as any).mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, message: 'Заявка отправлена' }),
    });
  });

  it('should render form fields', () => {
    render(<CarEvaluationForm />);
    
    expect(screen.getByLabelText(/марка/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/модель/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/год/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/пробег/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/телефон/i)).toBeInTheDocument();
  });

  it('should show brand suggestions when typing', async () => {
    render(<CarEvaluationForm />);
    
    const brandInput = screen.getByLabelText(/марка/i);
    fireEvent.change(brandInput, { target: { value: 'Toy' } });
    
    await waitFor(() => {
      expect(screen.getByText(/toyota/i)).toBeInTheDocument();
    });
  });

  it('should validate required fields', async () => {
    render(<CarEvaluationForm />);
    
    const submitButton = screen.getByRole('button', { name: /отправить/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      // Проверяем наличие ошибок валидации
      const errors = screen.queryAllByText(/обязательно/i);
      expect(errors.length).toBeGreaterThan(0);
    });
  });

  it('should submit form with valid data', async () => {
    render(<CarEvaluationForm />);
    
    const brandInput = screen.getByLabelText(/марка/i);
    const phoneInput = screen.getByLabelText(/телефон/i);
    const submitButton = screen.getByRole('button', { name: /отправить/i });
    
    fireEvent.change(brandInput, { target: { value: 'Toyota' } });
    fireEvent.change(phoneInput, { target: { value: '+79991234567' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/evaluation'),
        expect.objectContaining({
          method: 'POST',
        })
      );
    });
  });

  it('should show loading state during submission', async () => {
    (global.fetch as any).mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve({ ok: true, json: async () => ({ success: true }) }), 100))
    );
    
    render(<CarEvaluationForm />);
    
    const brandInput = screen.getByLabelText(/марка/i);
    const phoneInput = screen.getByLabelText(/телефон/i);
    const submitButton = screen.getByRole('button', { name: /отправить/i });
    
    fireEvent.change(brandInput, { target: { value: 'Toyota' } });
    fireEvent.change(phoneInput, { target: { value: '+79991234567' } });
    fireEvent.click(submitButton);
    
    // Проверяем, что кнопка показывает состояние загрузки
    expect(submitButton).toBeDisabled();
  });
});

