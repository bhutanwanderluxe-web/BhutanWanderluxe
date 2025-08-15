import React, { useEffect, useState } from "react";
import axios from "axios";
import { ScheduleXCalendar, useCalendarApp } from "@schedule-x/react";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import { createViewMonthGrid } from "@schedule-x/calendar";
import "@schedule-x/theme-default/dist/index.css";
import { useAuth } from "../AuthContext/AuthContext";

const EventModal = ({ event, onClose }) => {
    if (!event) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
                <h2 className="text-xl font-bold mb-2">{event.title}</h2>

                {/* Show image if available */}
                {event.imageEvent && (
                    <img
                        src={event.imageEvent}
                        alt={event.title}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                )}

                {event.description && (
                    <p className="mb-4 text-gray-700">{event.description}</p>
                )}

                <p>
                    <strong>Start:</strong>{" "}
                    {new Date(event.start).toLocaleDateString()}
                </p>
                <p>
                    <strong>End:</strong>{" "}
                    {new Date(event.end).toLocaleDateString()}
                </p>

                <div className="mt-4 flex justify-end">
                    <button
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

const EventCalendar = () => {
    const { token } = useAuth();
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const eventsServicePlugin = createEventsServicePlugin();

    useEffect(() => {
        fetchEvents();
    }, [token]);

    const fetchEvents = async () => {
        try {
            const { data } = await axios.get("http://localhost:5000/api/v1/events");
            console.log(data, "events response");

            const eventsArray = data.doc || data.data || [];

            setEvents(
                eventsArray.map(ev => ({
                    id: ev._id,
                    title: ev.title,
                    description: ev.description,
                    imageEvent: ev.imageEvent, // Include image here
                    start: ev.start?.split("T")[0] || "",
                    end: ev.end?.split("T")[0] || "",
                }))
            );
        } catch (err) {
            console.error("Failed to fetch events:", err);
        }
    };

    const calendar = useCalendarApp({
        views: [createViewMonthGrid()],
        events,
        plugins: [eventsServicePlugin],
        callbacks: {
            onEventClick: (event) => {
                const found = events.find(e => e.id === event.id);
                if (found) setSelectedEvent(found);
            }
        }
    });

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Event Calendar</h2>
            <ScheduleXCalendar calendarApp={calendar} />
            {selectedEvent && (
                <EventModal
                    event={selectedEvent}
                    onClose={() => setSelectedEvent(null)}
                />
            )}
        </div>
    );
};

export default EventCalendar;
