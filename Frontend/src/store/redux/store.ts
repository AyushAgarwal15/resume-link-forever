
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import resumeReducer from './slices/resumeSlice';

// Configure Redux Persist for resumeReducer
const resumePersistConfig = {
  key: 'resume',
  storage,
  whitelist: [
    'name', 'title', 'location', 'email', 'phone', 'linkedin', 'github', 'profileImage',
    'summary', 'workExperiences', 'education', 'skills', 'certifications',
    'projects', 'languages', 'hobbies', 'awards', 'references', 'customSections',
    'visibleSections'
  ]
};

const persistedResumeReducer = persistReducer(resumePersistConfig, resumeReducer);

export const store = configureStore({
  reducer: {
    resume: persistedResumeReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false  // Needed for redux-persist
    })
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
