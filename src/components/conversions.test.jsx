import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Conversions from 'src/components/Conversion.jsx';
describe('Conversions component', () => {
	it('renders page without crashing', () => {
		const { container } = render(<Conversions />);
		expect(container).toBeInTheDocument();
	});
});
