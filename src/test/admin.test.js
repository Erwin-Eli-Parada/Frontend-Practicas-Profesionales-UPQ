import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen } from '@testing-library/react'
import { Admin } from "../pages/admin";
import { MainContext } from '../contexts/mainContext';
import { MemoryRouter } from 'react-router';
import { ModalUsuarios } from '../Components/modalAgregar';
import userEvent from '@testing-library/user-event';

describe('<Admin>', () => {
    let component

    beforeEach(() => {
        const MainContextValue = { usuario: "" };
        component = render(
            <MainContext.Provider value={MainContextValue}>
                <MemoryRouter initialEntries={['/admin']}>
                    <Admin />
                </MemoryRouter>
            </MainContext.Provider>
        );
    })

    test('renderizar admin', () => {
        expect(component).toBeDefined();
    })

    test('renderizar componentes admin', () => {
        expect(component.getByPlaceholderText("search")).toBeDefined();
        expect(component.getByText("Historial")).toBeDefined();
        expect(component.getByText("Agregar")).toBeDefined();
        expect(component.getByText("Anterior")).toBeDefined();
        expect(component.getByText("Siguiente")).toBeDefined();
        expect(component.getByRole('table')).toBeDefined();
    })

    test('funcionamiento boton historial', () => {
        const button = component.getByText("Historial");
        fireEvent.click(button);
    })

    test('funcionamiento boton agregar', () => {
        const button = component.getByText("Agregar");
        fireEvent.click(button);
    })

    test('funcionamiento de busqueda', () => {
        const busqueda = component.getByPlaceholderText("search");
        fireEvent.change(busqueda);
    })

})

describe('<Modal>', () => {
    let component

    beforeEach(() => {
        component = render(
            <ModalUsuarios show={true} setShow={() => { }} />
        );
    })

    test('renderizar modal', () => {
        expect(component).toBeDefined();
    })

    test('renderizar campos del modal', () => {
        expect(component.getByPlaceholderText("Nombre(s)")).toBeDefined();
        expect(component.getByPlaceholderText("Apellidos")).toBeDefined();
        expect(component.getByPlaceholderText("Usuario")).toBeDefined();
        expect(component.getByPlaceholderText("Correo")).toBeDefined();
        expect(component.getByPlaceholderText("Contraseña")).toBeDefined();
        expect(screen.getAllByRole('option').length).toBe(3)
    })

    test('probar funcion de selector', () => {
        expect(screen.getByRole('option', { name: 'Administrador' }).selected).toBe(true)
        userEvent.selectOptions(
            screen.getByRole('combobox'),
            screen.getByRole('option', { name: 'Staff' }),
        )
        expect(screen.getByRole('option', { name: 'Staff' }).selected).toBe(true)
    })

    test('funcionamiento boton guardar', () => {
        const button = component.getByText("Guardar");
        fireEvent.click(button);
    })

    test('funcionamiento boton cerrar', () => {
        const button = component.getByText("Cerrar");
        fireEvent.click(button);
    })
})
