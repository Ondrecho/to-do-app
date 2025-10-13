DO
$$
BEGIN
   IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'todo') THEN
      CREATE DATABASE todo;
   END IF;
END
$$;
