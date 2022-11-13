const { response, request } = require('express');
const Event = require('../models/Event');

const getEvents = async (req = request, resp = response) => {
    try {
        const events = await Event.find().populate('user', 'name');
        return resp.status(200).json({
            ok: true,
            msj: 'eventos obtenidos correctamente',
            events,
        });
    } catch (error) {
        return resp.status(500).json({
            ok: false,
            msj: 'Error al obtener los eventos',
        });
    }
};

const createEvent = async (req = request, resp = response) => {
    const event = new Event(req.body);

    try {
        event.user = req.id;
        const newEvent = await event.save();

        return resp.status(201).json({
            ok: true,
            msj: 'evento creado correctamente',
            event: newEvent,
        });
    } catch (error) {
        return resp.status(500).json({
            ok: false,
            msj: 'Error al crear un evento',
        });
    }
};

const updateEvent = async (req = request, resp = response) => {
    try {
        const eventId = req.params.id;
        const userId = req.id;

        const event = await Event.findById(eventId);

        if (!event) {
            return resp.status(404).json({
                ok: false,
                msj: `El evento no existe con ese id ${eventId}`,
            });
        }

        if (event.user.toString() !== userId) {
            return resp.status(401).json({
                ok: false,
                msj: `no tiene permisos para editar este evento`,
            });
        }

        const eventNew = {
            ...req.body,
            user: userId,
        };

        const eventEdit = await Event.findByIdAndUpdate(eventId, eventNew, {
            new: true,
        });

        return resp.status(200).json({
            ok: true,
            msj: 'Evento actualizado correctamente',
            eventEdit,
        });
    } catch (error) {
        return resp.status(500).json({
            ok: false,
            msj: 'Error al actualizar el evento',
        });
    }
};

const deleteEvent = async (req = request, resp = response) => {
    try {
        const eventId = req.params.id;
        const userId = req.id;
        const event = await Event.findById(eventId);

        if (!event) {
            return resp.status(404).json({
                ok: false,
                msj: `El evento no existe con ese id ${eventId}`,
            });
        }

        if (event.user.toString() !== userId) {
            return resp.status(401).json({
                ok: false,
                msj: `no tiene permisos para editar este evento`,
            });
        }

        await Event.findByIdAndDelete(eventId);

        return resp.status(200).json({
            ok: true,
            msj: 'Evento eliminado correctamente',
        });
    } catch (error) {
        return resp.status(500).json({
            ok: true,
            msj: 'Error al eliminar el evento',
        });
    }
};

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent,
};
