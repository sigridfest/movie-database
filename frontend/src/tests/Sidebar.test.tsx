import React from "react";
import {cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Sidebar from "../components/sidebar/Sidebar";

// The component is no longer in use 

beforeEach(() => {
    render(<Sidebar />);
});


afterEach(() => {
    cleanup(); 
});

test('Testing the button to show sidebar component', () => {
    const element = screen.getByRole('button');
    expect(element).toBeInTheDocument();
});

test('Testing that the sidebar (drawer) shows up after button is clicked', () => {
    const button = screen.getByRole('button');
    userEvent.click(button);
    const drawer = screen.getByRole("presentation");
    expect(drawer).toBeInTheDocument();
});


test('Testing that checkbox exists in the drawer', () => {
    const button = screen.getByRole('button');
    userEvent.click(button);
    const checkbox = screen.getByText("Comedy");
    expect(checkbox).toBeInTheDocument();
});


