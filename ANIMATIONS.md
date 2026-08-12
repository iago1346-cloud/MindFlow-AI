# Animações GSAP - MindFlow AI

Este arquivo documenta as animações e transições de scroll implementadas no site MindFlow AI utilizando a biblioteca GSAP (GreenSock Animation Platform).

## 📚 Bibliotecas Utilizadas

- **GSAP Core** (3.12.2): Animações e tweens
- **ScrollTrigger**: Animações acionadas pelo scroll
- **ScrollToPlugin**: Smooth scroll para links âncora

## 🎬 Animações Implementadas

### 1. **Animações de Entrada - Hero Section**
- Fade in progressivo do eyebrow, título, descrição e botões
- Delay escalonado para efeito em cascata
- Duração: 0.8s com ease `power2.out`

### 2. **Study Panel - Entrada Lateral**
- Slide in da direita com fade
- Delay de 0.5s após hero
- Suaviza a apresentação dos dados de estudo

### 3. **Efeito Hover em Botões**
- Elevação suave (translateY -2px)
- Adição de sombra ao passar o mouse
- Transição de 0.3s
- Aplicado a todos os elementos com classe `.button`

### 4. **Scroll Triggers - Seções Animadas**
- Cada seção faz fade in e slide up ao entrar na viewport
- Acionado quando a seção atinge 80% do viewport
- Sem scrub (animação rápida ao invés de vinculada ao scroll)

### 5. **Cards com Stagger Animation**
- Cards aparecem em sequência ao scroll
- Delay progressivo entre cada card (0.1s)
- Efeito hover: elevação e aumento de sombra
- Aplicado a: progress-card, cards de features, step-cards

### 6. **Smooth Scroll para Links Âncora**
- Links #intro, #beneficios, etc. usam ScrollToPlugin
- Duração: 1s com ease `power2.inOut`
- Suave e intuitivo

### 7. **Progress Bars - Animação de Preenchimento**
- As barras de progresso são preenchidas ao scroll
- Efeito de contagem (0% → valor real)
- Duração: 1.2s com ease `power2.out`

### 8. **Header Sticky com Hide/Show**
- Header desaparece ao rolar para baixo (velocidade negativa)
- Header reaparece ao rolar para cima
- Suaviza a navegação sem ocupar espaço

### 9. **Títulos de Seção - Fade In**
- Todos os `<h2>` e `<h3>` de seções fazem fade in ao scroll
- Suaviza a leitura visual
- Duração: 0.6s

### 10. **Listas e Itens - Stagger Animation**
- Itens de listas desaparecem da esquerda (autoAlpha 0, x -30)
- Cada item tem delay progressivo (0.08s)
- Cria efeito de cascata elegante

### 11. **Logo Brand - Animação Reativa ao Scroll**
- Logo rotaciona levemente com a velocidade de scroll
- Oferece feedback visual do movimento da página
- Rotação proporcional à velocidade

## ⚙️ Otimizações de Performance

### will-change Properties
```css
body { will-change: scroll-position; }
.button { will-change: transform, box-shadow; }
.progress-card { will-change: transform, box-shadow; }
.schedule-list article { will-change: transform, box-shadow; }
.benefit-item { will-change: transform, box-shadow; }
.step-card { will-change: transform, box-shadow; }
.section { will-change: opacity; }
```

### Boas Práticas Implementadas
1. ✅ Uso de **transforms** ao invés de top/left (melhor performance)
2. ✅ **autoAlpha** ao invés de opacity para otimização
3. ✅ **ScrollTrigger.refresh()** após carregamento e redimensionamento
4. ✅ Cleanup de ScrollTriggers ao sair da página
5. ✅ Throttling de scroll events (ScrollTrigger handles)

## 📂 Arquivos Modificados

### Novo
- `animations.js` - Arquivo principal com todas as animações

### Modificados
- `index.html` - Adicionados scripts GSAP
- Todas as páginas em `pages/` - Scripts GSAP adicionados
- `styles/style.css` - Adicionadas propriedades will-change

## 🚀 Como Usar

As animações são inicializadas automaticamente quando o documento carrega. Não requer configuração adicional.

### Adicionar Novas Animações

Para adicionar animações em novos elementos, siga o padrão GSAP:

```javascript
// Animação simples
gsap.to(".seu-elemento", {
  duration: 0.5,
  opacity: 1,
  y: 0,
  ease: "power2.out"
});

// Com ScrollTrigger
gsap.from(".seu-elemento", {
  scrollTrigger: {
    trigger: ".seu-elemento",
    start: "top 80%",
    markers: false,
  },
  autoAlpha: 0,
  y: 30,
  duration: 0.6
});
```

## 📊 Easing Functions Utilizadas

- **power2.out** - Desaceleração suave (entrada padrão)
- **power2.inOut** - Aceleração e desaceleração (smooth scroll)
- **power2** - Timeline padrão com easing consistente

## 🔗 Referências

- [GSAP Documentation](https://gsap.com/)
- [ScrollTrigger API](https://gsap.com/docs/v3/Plugins/ScrollTrigger)
- [GitHub GSAP Skills](https://github.com/greensock/gsap-skills)

## 💡 Dicas de Performance

1. Use `gsap.context()` para cleanup automático em React
2. Evite animar propriedades CSS complexas (sombras, borders)
3. Use `will-change` apenas em elementos animados
4. Combine tweens em timelines quando possível
5. Use `markers: false` em produção para ScrollTrigger

---

**Versão**: 1.0  
**Atualizado**: 2026-08-12  
**GSAP**: 3.12.2
