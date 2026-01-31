# Como Remover o Fundo das Imagens dos Totens

## 🎯 Objetivo
Remover o fundo branco/preto das imagens dos totens para deixar transparente e harmonizar com a LP.

## 📸 Imagens para Processar

1. `assets/totem-azul-classico.png`
2. `assets/totem-branco-moderno.png`
3. `assets/totem-preto-premium.png`
4. `assets/totem-branco-minimalista.png`
5. `assets/totem-vermelho.png`
6. `assets/totem-branco-verde.png`

## 🛠️ Método 1: Remove.bg (Recomendado - Mais Fácil)

### Passo a Passo:

1. **Acesse**: https://www.remove.bg/pt-br

2. **Para cada imagem**:
   - Clique em "Upload Image"
   - Selecione a imagem (ex: `totem-azul-classico.png`)
   - Aguarde o processamento (5-10 segundos)
   - Clique em "Download" (HD gratuito)
   - Salve com o mesmo nome na pasta `assets/`

3. **Repita** para todas as 6 imagens

**Vantagens**:
- ✅ Gratuito (até 50 imagens/mês)
- ✅ Alta qualidade
- ✅ Automático (IA)
- ✅ Sem instalação

## 🛠️ Método 2: Photoshop / GIMP

### Photoshop:

1. Abra a imagem
2. Selecione a ferramenta "Magic Wand" (Varinha Mágica)
3. Clique no fundo branco/preto
4. Pressione `Delete`
5. Salve como PNG com transparência

### GIMP (Gratuito):

1. Abra a imagem
2. Menu: `Layer` → `Transparency` → `Add Alpha Channel`
3. Ferramenta: "Select by Color"
4. Clique no fundo
5. Pressione `Delete`
6. Exporte como PNG

## 🛠️ Método 3: Python Script (Automático)

Se você tiver Python instalado:

```bash
# Instalar biblioteca (apenas uma vez)
pip install rembg

# Executar script
python remove-bg.py
```

O script já está criado e processará todas as imagens automaticamente.

## ✅ Verificação

Após remover o fundo:
1. Abra a imagem em um editor
2. Verifique se o fundo está transparente (padrão xadrez)
3. Substitua a imagem antiga na pasta `assets/`
4. Faça commit e push para o GitHub

## 📝 Notas

- **Formato**: Sempre salvar como PNG (suporta transparência)
- **Qualidade**: Manter alta resolução
- **Backup**: O script Python cria backups automaticamente
- **Nomes**: Manter os mesmos nomes de arquivo

## 🚀 Após Processar

```bash
git add assets/*.png
git commit -m "feat: Remover fundo das imagens dos totens para transparência"
git push origin main
```

O deploy da Vercel será automático!
