create database personalsoft;
DROP TABLE IF EXISTS `tb_product`;
CREATE TABLE `tb_product` (
  `consecutive` int NOT NULL AUTO_INCREMENT,
  `name` varchar(300) NOT NULL,
  `type` varchar(20) NOT NULL,
  `price` int NOT NULL,
  `cant` int NOT NULL,
  `status` int NOT NULL,
  PRIMARY KEY (`consecutive`)
);
INSERT INTO `tb_product` (`name`, `type`, `price`, `cant`, `status`) VALUES
('Jean', 'Hombre', 150000, 10, 1),
('Falda', 'Mujer', 200000, 20, 1),
('Camisa', 'Mujer', 50000, 30, 1),
('Buzo', 'Hobre', 90000, 8, 1);