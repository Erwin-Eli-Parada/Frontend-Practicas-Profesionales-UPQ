import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen } from '@testing-library/react'
import { MainContext } from '../contexts/mainContext';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import { Datos } from "../pages/datos";
import { ModalEncuestas } from '../Components/modalEncuestas';
import { ModalAgregarArchivo } from '../Components/modalAgregarArchivo';

describe('<Datos>', () => {
    let component

    beforeEach(() => {
        const MainContextValue = { usuario: "" };
        component = render(
            <MainContext.Provider value={MainContextValue}>
                <MemoryRouter initialEntries={['/datos']}>
                    <Datos />
                </MemoryRouter>
            </MainContext.Provider>
        );
    })

    test('renderizar datos', () => {
        expect(component).toBeDefined();
    })

    test('renderizar componentes datos', () => {
        expect(component.getByPlaceholderText("search")).toBeDefined();
        expect(component.getByText("Agregar")).toBeDefined();
        expect(component.getByText("Anterior")).toBeDefined();
        expect(component.getByText("Siguiente")).toBeDefined();
        expect(component.getByRole('table')).toBeDefined();
        expect(screen.getByLabelText("tipoSelect")).toBeDefined();
        expect(screen.getByLabelText("estatusSelect")).toBeDefined();
        expect(screen.getByLabelText("carreraSelect")).toBeDefined();
        expect(screen.getByLabelText("generoSelect")).toBeDefined();
        expect(screen.getByLabelText("giroSelect")).toBeDefined();
        expect(screen.getByLabelText("tamanioSelect")).toBeDefined();
        expect(component.getByTestId("number-input")).toBeDefined();
    })

    test('funcionamiento boton agregar', () => {
        const button = component.getByText("Agregar");
        fireEvent.click(button);
    })

    test('funcionamiento de busqueda', () => {
        const busqueda = component.getByPlaceholderText("search");
        fireEvent.change(busqueda);
    })

    test('probar funcion de selector de tipo', () => {
        const selectElement = screen.getByLabelText("tipoSelect")
        fireEvent.change(selectElement, { target: { value: 'Estadia' } });
        expect(selectElement.value).toBe('Estadia');
    })

    test('probar funcion de selector de estatus', () => {
        const selectElement = screen.getByLabelText("estatusSelect")
        fireEvent.change(selectElement, { target: { value: 'Autorizado' } });
        expect(selectElement.value).toBe('Autorizado');
    })

    test('probar funcion de selector de carrera', () => {
        const selectElement = screen.getByLabelText("carreraSelect")
        fireEvent.change(selectElement, { target: { value: 'Automotriz' } });
        expect(selectElement.value).toBe('Automotriz');
    })

    test('probar funcion de selector de genero', () => {
        const selectElement = screen.getByLabelText("generoSelect")
        fireEvent.change(selectElement, { target: { value: 'Masculino' } });
        expect(selectElement.value).toBe('Masculino');
    })

    test('probar funcion de selector de giro', () => {
        const selectElement = screen.getByLabelText("giroSelect")
        fireEvent.change(selectElement, { target: { value: 'investigacion' } });
        expect(selectElement.value).toBe('investigacion');
    })

    test('probar funcion de selector de tamaño', () => {
        const selectElement = screen.getByLabelText("tamanioSelect")
        fireEvent.change(selectElement, { target: { value: 'M' } });
        expect(selectElement.value).toBe('M');
    })
})

describe('<Modal Encuesta>', () => {
    let component

    beforeEach(() => {
        component = render(
            <ModalEncuestas show={true} setShow={() => { }} />
        );
    })

    test('renderizar modal', () => {
        expect(component).toBeDefined();
    })

    test('renderizar campos del modal', () => {
        expect(component.getByRole('table')).toBeDefined();
    })

    test('funcionamiento boton cerrar', () => {
        const button = component.getByText("Cerrar");
        fireEvent.click(button);
    })
})

describe('<Modal Archivo>', () => {
    let component

    beforeEach(() => {
        component = render(
            <ModalAgregarArchivo show={true} setShow={() => { }} />
        );
    })

    test('renderizar modal', () => {
        expect(component).toBeDefined();
    })

    test('renderizar campos del modal', () => {
        expect(screen.getByLabelText("opcion1")).toBeDefined();
        expect(screen.getByLabelText("opcion2")).toBeDefined();
    })

    test('funcionamiento boton cerrar', () => {
        const button = component.getByText("Cerrar");
        fireEvent.click(button);
    })

    test('funcionamiento radio boton', () => {
        const opcion2 = screen.getByLabelText("opcion2")
        const opcion1 = screen.getByLabelText("opcion1")
        fireEvent.click(opcion2);
        expect(opcion2.checked).toBe(true);
        fireEvent.click(opcion1);
        expect(opcion1.checked).toBe(true);
    })
})