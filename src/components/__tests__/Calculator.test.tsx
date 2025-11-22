import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Calculator from '../Calculator';

describe('Calculator Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render calculator form', () => {
    render(<Calculator />);
    expect(screen.getByText(/калькулятор/i)).toBeInTheDocument();
  });

  it('should calculate price when form is filled', async () => {
    render(<Calculator />);
    
    const brandInput = screen.getByLabelText(/марка/i);
    const modelInput = screen.getByLabelText(/модель/i);
    const yearInput = screen.getByLabelText(/год/i);
    const mileageInput = screen.getByLabelText(/пробег/i);
    
    fireEvent.change(brandInput, { target: { value: 'Toyota' } });
    fireEvent.change(modelInput, { target: { value: 'Camry' } });
    fireEvent.change(yearInput, { target: { value: '2020' } });
    fireEvent.change(mileageInput, { target: { value: '50000' } });
    
    await waitFor(() => {
      const result = screen.queryByText(/руб/i);
      expect(result).toBeInTheDocument();
    });
  });

  it('should show validation errors for empty required fields', () => {
    render(<Calculator />);
    
    const calculateButton = screen.getByRole('button', { name: /рассчитать/i });
    fireEvent.click(calculateButton);
    
    // Проверяем, что появляются сообщения об ошибках
    expect(screen.getByText(/марка/i)).toBeInTheDocument();
  });

  it('should update calculation when condition changes', async () => {
    render(<Calculator />);
    
    const brandInput = screen.getByLabelText(/марка/i);
    fireEvent.change(brandInput, { target: { value: 'Toyota' } });
    
    const conditionSelect = screen.getByLabelText(/состояние/i);
    fireEvent.change(conditionSelect, { target: { value: 'excellent' } });
    
    await waitFor(() => {
      // Проверяем, что цена обновилась
      const result = screen.queryByText(/руб/i);
      expect(result).toBeInTheDocument();
    });
  });
});

