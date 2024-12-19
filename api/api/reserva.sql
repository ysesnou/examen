-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-10-2024 a las 03:46:40
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `reserva`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `id` int(11) NOT NULL,
  `modelo` varchar(255) NOT NULL,
  `direccion` varchar(255) NOT NULL,
  `tiempo` varchar(100) NOT NULL,
  `costo` int(11) DEFAULT NULL,
  `descripcion` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pedidos`
--

INSERT INTO `pedidos` (`id`, `modelo`, `direccion`, `tiempo`, `costo`, `descripcion`) VALUES
(1, 'BMW XM', 'Viaje a Pudahuel', '45 min', 5000, 'Te acercamos al Metro de Pudahuel para que el viaje hacia tu casa te sea más corto y seguro. El precio es $5.000 por persona y el viaje es de aproximadamente 45 min. Te esperamos durante 15 minutos.'),
(2, 'Impala 1964', 'Viaje a Maipú', '55 min', 6500, 'Te acercamos al Metro de Maipú para que el viaje hacia tu casa te sea más corto y seguro. El precio es $6.500 por persona y el viaje es de aproximadamente 55 min. Te esperamos durante 15 minutos.'),
(3, 'Ferrari F40', 'Viaje a Providencia', '1h 15 min', 100000, 'Te acercamos al Metro de Providencia para que el viaje hacia tu casa te sea más corto y seguro. El precio es $100.000 por persona y el viaje es de aproximadamente 1 hora 15 min. Te esperamos durante 15 minutos.'),
(4, 'Tesla Model S', 'Viaje a Santiago', '30 min', 20000, 'Te acercamos al centro de Santiago en un Tesla Model S. El precio es $20.000 por persona y el viaje es de aproximadamente 30 min.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `correo` varchar(255) NOT NULL,
  `contrasena` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `correo` (`correo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
