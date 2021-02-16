import app from './app';

const PORT = process.env.NODE_PORT || 3001;

app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`));
