import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import Controls from './Controls';

describe('<Controls />', () => {
    const setup = () => {
        render(<Provider store={store}><Controls /></Provider>)
        const officeFilter = screen.getByRole('office-filter')

        return {
            officeFilter
        }
    }

    it('has filter controls', () => {
        const { officeFilter } = setup()
        expect(officeFilter).toBeInTheDocument()
    })

    it('change office', () => {
        const { officeFilter } = setup()

        fireEvent.change(officeFilter, {
            target: {
                value: 'LONDON'
            }
        })
        expect(officeFilter.value).toBe('LONDON')
    })
})