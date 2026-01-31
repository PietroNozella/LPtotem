#!/usr/bin/env python3
"""
Script para remover fundo das imagens dos totens
Usa a biblioteca rembg (https://github.com/danielgatis/rembg)
"""

import os
from pathlib import Path

try:
    from rembg import remove
    from PIL import Image
except ImportError:
    print("Instalando dependências necessárias...")
    os.system("pip install rembg pillow")
    from rembg import remove
    from PIL import Image

# Lista de imagens para processar
images_to_process = [
    "assets/totem-azul-classico.png",
    "assets/totem-branco-moderno.png",
    "assets/totem-preto-premium.png",
    "assets/totem-branco-minimalista.png",
    "assets/totem-vermelho.png",
    "assets/totem-branco-verde.png"
]

def remove_background(input_path, output_path):
    """Remove o fundo de uma imagem"""
    print(f"Processando: {input_path}")
    
    # Abrir imagem
    with open(input_path, 'rb') as input_file:
        input_data = input_file.read()
    
    # Remover fundo
    output_data = remove(input_data)
    
    # Salvar imagem sem fundo
    with open(output_path, 'wb') as output_file:
        output_file.write(output_data)
    
    print(f"✓ Salvo: {output_path}")

def main():
    print("=== Removedor de Fundo de Imagens ===\n")
    
    for image_path in images_to_process:
        if not os.path.exists(image_path):
            print(f"⚠ Arquivo não encontrado: {image_path}")
            continue
        
        # Criar backup
        backup_path = image_path.replace(".png", "-with-bg.png")
        if not os.path.exists(backup_path):
            os.rename(image_path, backup_path)
            print(f"Backup criado: {backup_path}")
        else:
            image_path = backup_path
        
        # Remover fundo
        output_path = image_path.replace("-with-bg.png", ".png")
        remove_background(image_path, output_path)
        print()
    
    print("✓ Todas as imagens processadas com sucesso!")
    print("\nBackups salvos com sufixo '-with-bg.png'")

if __name__ == "__main__":
    main()
