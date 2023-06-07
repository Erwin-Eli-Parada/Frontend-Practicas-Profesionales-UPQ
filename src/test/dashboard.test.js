import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen } from '@testing-library/react'
import { Dashboard } from "../pages/dashboard";
import { MainContext } from '../contexts/mainContext';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';

describe('<Dashboard>', () => {
    let component

    beforeEach(() => {
        const MainContextValue = { setUsuario: e=>{}, setAuth: e=>{}, setStaff: e=>{}, setSuperUser: e=>{}};  
        const location = {
            pathname: '/dashboard',  
            search: '',         
            hash: '',             
            state: {usuario:"usuario"}              
          };
        component = render(
            <MainContext.Provider value={MainContextValue}>
                <MemoryRouter initialEntries={[location]}>
                    <Dashboard />
                </MemoryRouter> 
            </MainContext.Provider>
        );
    })

    test('renderizar dashboard', () => {
        expect(component).toBeDefined();
    })

    test('renderizar componentes dashboard', () => {
        expect(component.getByText("Dashboard")).toBeDefined();
        expect(component.getByText("Generar Reporte")).toBeDefined();
    }) 

}) 
