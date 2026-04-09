import { useState, useEffect } from 'react'
import { CloseIcon, UsersIcon, EmailIcon } from '../Icons'
import { adminFetchAttendees } from '../../lib/api'

export default function AttendeeRoster({ event, token, onClose }) {
  const [attendees, setAttendees] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    adminFetchAttendees(token, event.id)
      .then(setAttendees)
      .catch(() => setAttendees([]))
      .finally(() => setLoading(false))
  }, [event.id, token])

  return (
    <div className="fixed inset-0 bg-charcoal/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-gold/10 w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gold/10">
          <div>
            <h2 className="font-serif text-xl text-charcoal">{event.name}</h2>
            <p className="text-charcoal-light text-sm mt-0.5">Attendee Roster</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-cream transition-colors">
            <CloseIcon className="w-5 h-5 text-charcoal-light" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-12 bg-cream-dark rounded-lg animate-pulse" />
              ))}
            </div>
          ) : attendees.length === 0 ? (
            <div className="text-center py-8">
              <UsersIcon className="w-12 h-12 text-gold/30 mx-auto mb-3" />
              <p className="text-charcoal-light text-sm">No attendees yet.</p>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 mb-4">
                <UsersIcon className="w-4 h-4 text-gold" />
                <span className="text-sm font-medium text-charcoal">
                  {attendees.length} attendee{attendees.length !== 1 ? 's' : ''}
                </span>
              </div>
              <div className="space-y-2">
                {attendees.map((att, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 rounded-lg bg-cream/50 border border-gold/5"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-sage/15 flex items-center justify-center text-sage-dark text-xs font-medium">
                        {att.firstName[0]}{att.lastName[0]}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-charcoal">
                          {att.firstName} {att.lastName}
                        </p>
                        <p className="text-xs text-charcoal-light flex items-center gap-1">
                          <EmailIcon className="w-3 h-3" />
                          {att.email}
                        </p>
                      </div>
                    </div>
                    {att.isBuyer && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-gold/10 text-gold-dark font-medium">
                        Purchaser
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
