CREATE TABLE public.posts (
    id uuid NOT NULL,
    title text,
    longitude double precision,
    latitude double precision,
    "timestamp" timestamp without time zone,
    type text
);

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT blogs_pk PRIMARY KEY (id);


CREATE TABLE public.images (
    id uuid NOT NULL,
    path text NOT NULL,
    description text
);


CREATE TABLE public.image_posts (
    id uuid NOT NULL,
    description text,
    image_id uuid NOT NULL
);

ALTER TABLE ONLY public.image_posts
    ADD CONSTRAINT image_posts_pkey PRIMARY KEY (id);



CREATE TABLE public.text_posts (
    id uuid NOT NULL,
    content text NOT NULL
);


ALTER TABLE ONLY public.text_posts
    ADD CONSTRAINT text_posts_pkey PRIMARY KEY (id);
