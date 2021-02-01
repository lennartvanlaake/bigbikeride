--
-- PostgreSQL database dump
--

-- Dumped from database version 12.1 (Debian 12.1-1.pgdg100+1)
-- Dumped by pg_dump version 12.2 (Ubuntu 12.2-2.pgdg18.04+1)

-- Started on 2021-01-31 19:38:44 CET

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2926 (class 1262 OID 73965)
-- Name: blog; Type: DATABASE; Schema: -; Owner: hubperdbuser
--

CREATE DATABASE blog WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.utf8' LC_CTYPE = 'en_US.utf8';


ALTER DATABASE blog OWNER TO hubperdbuser;

\connect blog

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 204 (class 1259 OID 73979)
-- Name: image_posts; Type: TABLE; Schema: public; Owner: hubperdbuser
--

CREATE TABLE public.image_posts (
    id uuid NOT NULL,
    description text,
    image_id uuid NOT NULL
);


ALTER TABLE public.image_posts OWNER TO hubperdbuser;

--
-- TOC entry 205 (class 1259 OID 73987)
-- Name: images; Type: TABLE; Schema: public; Owner: hubperdbuser
--

CREATE TABLE public.images (
    id uuid NOT NULL,
    path text NOT NULL
);


ALTER TABLE public.images OWNER TO hubperdbuser;

--
-- TOC entry 202 (class 1259 OID 73966)
-- Name: posts; Type: TABLE; Schema: public; Owner: hubperdbuser
--

CREATE TABLE public.posts (
    id uuid NOT NULL,
    title text,
    longitude double precision,
    latitude double precision,
    "timestamp" timestamp without time zone,
    type text
);


ALTER TABLE public.posts OWNER TO hubperdbuser;

--
-- TOC entry 203 (class 1259 OID 73972)
-- Name: text_posts; Type: TABLE; Schema: public; Owner: hubperdbuser
--

CREATE TABLE public.text_posts (
    id uuid NOT NULL
);


ALTER TABLE public.text_posts OWNER TO hubperdbuser;

--
-- TOC entry 2790 (class 2606 OID 73978)
-- Name: posts blogs_pk; Type: CONSTRAINT; Schema: public; Owner: hubperdbuser
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT blogs_pk PRIMARY KEY (id);


--
-- TOC entry 2794 (class 2606 OID 73986)
-- Name: image_posts image_posts_pkey; Type: CONSTRAINT; Schema: public; Owner: hubperdbuser
--

ALTER TABLE ONLY public.image_posts
    ADD CONSTRAINT image_posts_pkey PRIMARY KEY (id);


--
-- TOC entry 2792 (class 2606 OID 73976)
-- Name: text_posts text_posts_pkey; Type: CONSTRAINT; Schema: public; Owner: hubperdbuser
--

ALTER TABLE ONLY public.text_posts
    ADD CONSTRAINT text_posts_pkey PRIMARY KEY (id);
