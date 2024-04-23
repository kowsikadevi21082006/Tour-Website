import { bookings } from './bookings/bookings.js'

import { tours } from './tours/tours.js'

import { user } from './users/users.js'

export const services = (app) => {
  app.configure(bookings)

  app.configure(tours)

  app.configure(user)

  // All services will be registered here
}
