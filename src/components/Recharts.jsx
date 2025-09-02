"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Ene",
    Ingresos: 4000,
    Retiros: 2400,
    Prestamos: 2050,
    Beneficios: 1600,
  },
  {
    name: "Feb",
    Ingresos: 4200,
    Retiros: 2800,
    Prestamos: 2050,
    Beneficios: 1400,
  },
  {
    name: "Mar",
    Ingresos: 4100,
    Retiros: 2700,
    Prestamos: 2050,
    Beneficios: 1400,
  },
  {
    name: "Abr",
    Ingresos: 4500,
    Retiros: 2900,
    Prestamos: 2050,
    Beneficios: 1600,
  },
  {
    name: "May",
    Ingresos: 4300,
    Retiros: 3100,
    Prestamos: 2050,
    Beneficios: 1200,
  },
  {
    name: "Jun",
    Ingresos: 4300,
    Retiros: 3100,
    Prestamos: 2050,
    Beneficios: 1200,
  },
]

export function Recharts() {
  return (
    <section className="flex justify-center relative">
        <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis tick={{fontSize : "12px"}} dataKey="name" />
            <YAxis tick={{fontSize : "12px"}} />
            <Tooltip />
            <Legend wrapperStyle={{ fontSize: '11px', justifyContent: 'center'}} />
            <Bar dataKey="Beneficios" fill="#22c55e" />
            <Bar dataKey="Ingresos" fill="#3b82f6" />
            <Bar dataKey="Prestamos" fill="#F99910" />
            <Bar dataKey="Retiros" fill="#ef4444" />
        </BarChart>
        </ResponsiveContainer>
    </section>
  )
}
