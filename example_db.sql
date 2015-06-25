--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: images; Type: TABLE; Schema: public; Owner: nyuad; Tablespace: 
--

CREATE TABLE images (
    item_name character varying NOT NULL,
    id integer NOT NULL,
    was_taken timestamp without time zone DEFAULT '2015-06-26 02:01:15.099931'::timestamp without time zone NOT NULL,
    archive boolean DEFAULT false NOT NULL,
    role character varying DEFAULT 'container'::character varying NOT NULL
);


ALTER TABLE public.images OWNER TO nyuad;

--
-- Name: images_id_seq; Type: SEQUENCE; Schema: public; Owner: nyuad
--

CREATE SEQUENCE images_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.images_id_seq OWNER TO nyuad;

--
-- Name: images_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: nyuad
--

ALTER SEQUENCE images_id_seq OWNED BY images.id;


--
-- Name: items; Type: TABLE; Schema: public; Owner: nyuad; Tablespace: 
--

CREATE TABLE items (
    id integer NOT NULL,
    item_name character varying NOT NULL,
    was_added timestamp without time zone DEFAULT '2015-06-26 02:04:44.289161'::timestamp without time zone NOT NULL,
    formal_name character varying,
    octo_name character varying,
    url_name character varying,
    item_location character varying,
    label_size character varying DEFAULT 'none'::character varying NOT NULL
);


ALTER TABLE public.items OWNER TO nyuad;

--
-- Name: items_id_seq; Type: SEQUENCE; Schema: public; Owner: nyuad
--

CREATE SEQUENCE items_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.items_id_seq OWNER TO nyuad;

--
-- Name: items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: nyuad
--

ALTER SEQUENCE items_id_seq OWNED BY items.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: nyuad; Tablespace: 
--

CREATE TABLE users (
    id integer NOT NULL,
    netid character varying NOT NULL,
    priv character varying DEFAULT 'user'::character varying NOT NULL
);


ALTER TABLE public.users OWNER TO nyuad;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: nyuad
--

CREATE SEQUENCE users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO nyuad;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: nyuad
--

ALTER SEQUENCE users_id_seq OWNED BY users.id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: nyuad
--

ALTER TABLE ONLY images ALTER COLUMN id SET DEFAULT nextval('images_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: nyuad
--

ALTER TABLE ONLY items ALTER COLUMN id SET DEFAULT nextval('items_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: nyuad
--

ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('users_id_seq'::regclass);


--
-- Data for Name: images; Type: TABLE DATA; Schema: public; Owner: nyuad
--

COPY images (item_name, id, was_taken, archive, role) FROM stdin;
\.


--
-- Name: images_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nyuad
--

SELECT pg_catalog.setval('images_id_seq', 1, false);


--
-- Data for Name: items; Type: TABLE DATA; Schema: public; Owner: nyuad
--

COPY items (id, item_name, was_added, formal_name, octo_name, url_name, item_location, label_size) FROM stdin;
\.


--
-- Name: items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nyuad
--

SELECT pg_catalog.setval('items_id_seq', 1, false);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: nyuad
--

COPY users (id, netid, priv) FROM stdin;
\.


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nyuad
--

SELECT pg_catalog.setval('users_id_seq', 1, false);


--
-- Name: items_item_name_1; Type: CONSTRAINT; Schema: public; Owner: nyuad; Tablespace: 
--

ALTER TABLE ONLY items
    ADD CONSTRAINT items_item_name_1 PRIMARY KEY (item_name);


--
-- Name: items_id; Type: INDEX; Schema: public; Owner: nyuad; Tablespace: 
--

CREATE INDEX items_id ON items USING btree (id);


--
-- Name: items_item_name_2; Type: INDEX; Schema: public; Owner: nyuad; Tablespace: 
--

CREATE INDEX items_item_name_2 ON items USING btree (item_name);


--
-- Name: images_item_name_fkey; Type: FK CONSTRAINT; Schema: public; Owner: nyuad
--

ALTER TABLE ONLY images
    ADD CONSTRAINT images_item_name_fkey FOREIGN KEY (item_name) REFERENCES items(item_name) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

