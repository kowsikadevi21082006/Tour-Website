// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  toursDataValidator,
  toursPatchValidator,
  toursQueryValidator,
  toursResolver,
  toursExternalResolver,
  toursDataResolver,
  toursPatchResolver,
  toursQueryResolver
} from './tours.schema.js'
import { ToursService, getOptions } from './tours.class.js'
import { toursPath, toursMethods } from './tours.shared.js'

export * from './tours.class.js'
export * from './tours.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const tours = (app) => {
  // Register our service on the Feathers application
  app.use(toursPath, new ToursService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: toursMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(toursPath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(toursExternalResolver), schemaHooks.resolveResult(toursResolver)]
    },
    before: {
      all: [schemaHooks.validateQuery(toursQueryValidator), schemaHooks.resolveQuery(toursQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(toursDataValidator), schemaHooks.resolveData(toursDataResolver)],
      patch: [schemaHooks.validateData(toursPatchValidator), schemaHooks.resolveData(toursPatchResolver)],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}
