
-- Insert some demo residents for testing
INSERT INTO residents (user_id, condominium_id, apartment_number, full_name, email, phone, is_verified, created_at, updated_at) VALUES
('demo_user_1', 1, '101', 'Maria Silva Santos', 'maria@email.com', '(11) 99999-1111', 1, datetime('now'), datetime('now')),
('demo_user_2', 1, '102', 'João Pedro Oliveira', 'joao@email.com', '(11) 99999-2222', 1, datetime('now'), datetime('now')),
('demo_user_3', 2, '201', 'Ana Carolina Lima', 'ana@email.com', '(11) 99999-3333', 1, datetime('now'), datetime('now')),
('demo_user_4', 3, '301', 'Carlos Eduardo Costa', 'carlos@email.com', '(11) 99999-4444', 1, datetime('now'), datetime('now')),
('demo_user_5', 4, '401', 'Fernanda Rodrigues', 'fernanda@email.com', '(11) 99999-5555', 1, datetime('now'), datetime('now'));

-- Insert some demo items
INSERT INTO items (owner_id, title, description, category, daily_rate, image_url, rules, created_at, updated_at) VALUES
(1, 'Furadeira Bosch 220v', 'Furadeira de impacto profissional, ideal para furos em alvenaria e madeira. Inclui maleta com brocas variadas.', 'ferramentas', 15.00, 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=500', 'Devolver limpa e com todas as brocas. Não usar em concreto armado.', datetime('now'), datetime('now')),
(1, 'Panela de Pressão Elétrica', 'Panela de pressão elétrica 6 litros, perfeita para cozinhar rapidamente. Marca Philips Walita.', 'cozinha', 12.00, 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500', 'Devolver limpa e seca. Não usar para frituras.', datetime('now'), datetime('now')),
(2, 'Aspirador de Pó Wap', 'Aspirador de pó potente com filtro HEPA. Ideal para limpeza profunda de carpetes e estofados.', 'casa-jardim', 20.00, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500', 'Esvaziar o compartimento após o uso. Trazer de volta limpo.', datetime('now'), datetime('now')),
(2, 'Bicicleta Ergométrica', 'Bicicleta ergométrica com 8 níveis de resistência. Perfeita para exercícios em casa.', 'esportes-lazer', 25.00, 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500', 'Limpar após o uso. Máximo 2 horas por dia.', datetime('now'), datetime('now')),
(3, 'Projetor Full HD', 'Projetor portátil Full HD com entrada HDMI e USB. Ideal para apresentações e cinema em casa.', 'eletrônicos', 35.00, 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=500', 'Manusear com cuidado. Incluir cabo HDMI na devolução.', datetime('now'), datetime('now')),
(3, 'Máquina de Costura Singer', 'Máquina de costura doméstica com vários pontos automáticos. Inclui kit básico de linhas.', 'outros', 18.00, 'https://images.unsplash.com/photo-1551972251-12070d63502a?w=500', 'Experiência básica em costura é recomendada.', datetime('now'), datetime('now')),
(4, 'Churrasqueira Elétrica', 'Churrasqueira elétrica grande para varanda. Capacidade para 8 pessoas.', 'cozinha', 30.00, 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=500', 'Limpar completamente após uso. Uso apenas em área ventilada.', datetime('now'), datetime('now')),
(4, 'Kit Ferramentas Completo', 'Maleta com ferramentas variadas: chaves de fenda, phillips, alicates, martelo, trena.', 'ferramentas', 10.00, 'https://images.unsplash.com/photo-1567788320508-d29b5b18b275?w=500', 'Conferir se todas as ferramentas estão na maleta antes de devolver.', datetime('now'), datetime('now')),
(5, 'Berço Portátil Baby', 'Berço dobrável para bebês até 15kg. Inclui colchão e lençol.', 'bebê-criança', 22.00, 'https://images.unsplash.com/photo-1515488764276-beab7607c1e6?w=500', 'Devolver higienizado. Roupa de cama deve ser lavada.', datetime('now'), datetime('now')),
(5, 'Mala de Viagem Grande', 'Mala rígida 28 polegadas com rodas 360°. Ideal para viagens longas.', 'viagem', 8.00, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500', 'Devolver limpa, sem odores. Verificar se não há objetos esquecidos.', datetime('now'), datetime('now'));
