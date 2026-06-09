export type GuideLang = "IT" | "EN" | "ES" | "FR" | "PT" | "DE";

type GuideTranslation = { title: string; desc: string; content?: string };

export const GUIDE_I18N: Record<string, Partial<Record<GuideLang, GuideTranslation>>> = {
  "cos-e-token-spl": {
    IT: { title: "Cos'è un token SPL su Solana", desc: "Mint address, supply, metadata e authority spiegati senza fuffa." },
    EN: { title: "What is an SPL token on Solana", desc: "Mint address, supply, metadata and authority explained without the fluff.", content: `
## Why you need to understand this before creating a token

On Solana, almost every token you see in wallets, on DEXs and on DexScreener is an SPL token.

Creating a token is simple. Understanding what you are creating is the important part.

A token is not just a name with a logo. It is an on-chain registered asset with a mint address, a supply, metadata and permissions that can influence user trust.

Many launches fail not because the token is hard to create, but because it is launched without properly understanding these elements.

## What is an SPL token

SPL stands for Solana Program Library. It is the standard used on Solana to create and manage tokens.

An SPL token can be:

- a memecoin
- a community token
- a reward token
- a utility token
- an asset used inside a dApp
- a token linked to a brand

Solana provides the technical infrastructure. The value, however, depends on the project, liquidity, community, trust and narrative.

## Mint address: the real identity

The mint address is the unique address of the token on the blockchain.

Name, symbol and logo can be copied. The mint address cannot.

Two tokens can both be called DOGE, but they will have different mint addresses. Only one will be the official project token.

When you launch a token, the mint address must be visible everywhere:

- official website
- Telegram
- X/Twitter
- DexScreener
- launch post
- documentation or guides

If the community cannot easily find the official mint address, confusion and the risk of fake tokens increase.

## Supply and decimals

The supply is the total quantity of tokens created.

Decimals indicate how many parts a token can be divided into. On Solana it is common to use 9 decimals, but it is not mandatory.

For a memecoin, high supplies are often chosen, such as 1 billion or 1 trillion. Not because they are better, but because they make the unit price smaller and more familiar to the meme market.

Supply does not automatically make a token more valuable. What matters is how it is distributed, how much liquidity is added and how much trust the market has.

## Metadata: the first impression

Metadata is the information that wallets, scanners and DEXs show to users.

Usually includes:

- name
- symbol
- logo
- description
- website
- social links

A token without a logo, without a description and without official links looks improvised. Even if it works technically, the perception will be weak.

A good token should have:

- a logo readable even when small
- an easy to remember name
- a simple ticker
- a short and clear description
- working official links

## Authority

When you create an SPL token, some authorities can remain active.

The most important ones are:

- **Mint Authority**: allows creating more tokens after launch
- **Freeze Authority**: allows freezing tokens in specific wallets
- **Update Authority**: allows modifying metadata

For a memecoin these authorities are very sensitive.

If Mint Authority remains active, users may fear the supply will be increased.
If Freeze Authority remains active, they may fear some wallets will be frozen.
If Update Authority remains active, they may fear the logo or metadata will change after launch.

Keeping an authority is not always wrong, but there must be a clear reason.

## Token created does not mean token launched

Creating a token means the token exists on-chain.

It does not mean it has:

- price
- volume
- market
- liquidity
- community
- visibility

To make it tradable you need a liquidity pool, usually TOKEN/SOL.

The pool allows users to buy and sell. Only after the pool is created can the token start appearing on tools like Raydium, Jupiter and DexScreener.

## Checklist before publishing

Before announcing the token, check:

- final name
- final symbol
- correct logo
- working social links
- chosen supply
- configured authorities
- saved mint address
- official message ready

Many mistakes become difficult or impossible to fix after launch.

## Conclusion

An SPL token is simple to create, but should not be treated as a technical detail.

It is the foundation of your launch.

If mint address, supply, metadata and authorities are managed well, you start with more credibility. If managed poorly, even a good idea can seem unreliable.
` },
    ES: { title: "Qué es un token SPL en Solana", desc: "Mint address, supply, metadata y authority explicados sin rodeos.", content: `
## Por qué debes entenderlo antes de crear un token

En Solana, casi todos los tokens que ves en wallets, en DEX y en DexScreener son tokens SPL.

Crear un token es simple. Entender qué estás creando es la parte importante.

Un token no es solo un nombre con un logo. Es un activo registrado on-chain, con una mint address, una supply, metadatos y permisos que pueden influir en la confianza de los usuarios.

Muchos lanzamientos fracasan no porque el token sea difícil de crear, sino porque se lanza sin entender bien estos elementos.

## Qué es un token SPL

SPL significa Solana Program Library. Es el estándar usado en Solana para crear y gestionar tokens.

Un token SPL puede ser:

- una memecoin
- un token community
- un token reward
- un token utility
- un activo usado dentro de una dApp
- un token vinculado a una marca

Solana proporciona la infraestructura técnica. El valor, en cambio, depende del proyecto, la liquidez, la comunidad, la confianza y la narrativa.

## Mint address: la identidad real

La mint address es la dirección única del token en la blockchain.

Nombre, símbolo y logo pueden copiarse. La mint address no.

Dos tokens pueden llamarse ambos DOGE, pero tendrán mint addresses diferentes. Solo uno será el oficial del proyecto.

Cuando lanzas un token, la mint address debe ser visible en todas partes:

- sitio oficial
- Telegram
- X/Twitter
- DexScreener
- post de lanzamiento
- documentación o guías

## Supply y decimales

La supply es la cantidad total de tokens creada.

Los decimales indican en cuántas partes se puede dividir un token. En Solana es común usar 9 decimales.

Para una memecoin se suelen elegir supplies altas, como 1 mil millones o 1 billón. No porque sean mejores, sino porque hacen el precio unitario más pequeño.

## Metadatos: la primera impresión

Los metadatos son la información que wallets, scanners y DEX muestran a los usuarios.

Normalmente incluyen nombre, símbolo, logo, descripción, website y redes sociales.

Un token sin logo, sin descripción y sin enlaces oficiales parece improvisado.

## Authority

Las más importantes son:

- **Mint Authority**: permite crear más tokens tras el lanzamiento
- **Freeze Authority**: permite congelar tokens en wallets específicas
- **Update Authority**: permite modificar los metadatos

Para una memecoin, estas authorities son muy sensibles para la confianza.

## Conclusión

Un token SPL es simple de crear, pero no debe tratarse como un detalle técnico.

Si mint address, supply, metadatos y authorities se gestionan bien, partes con más credibilidad.
` },
    FR: { title: "Qu'est-ce qu'un token SPL sur Solana", desc: "Mint address, supply, métadonnées et authority expliqués simplement.", content: `
## Pourquoi vous devez le comprendre avant de créer un token

Sur Solana, presque tous les tokens que vous voyez dans les portefeuilles, sur les DEX et sur DexScreener sont des tokens SPL.

Créer un token est simple. Comprendre ce que vous créez est la partie importante.

Un token n'est pas juste un nom avec un logo. C'est un actif enregistré on-chain, avec une mint address, une supply, des métadonnées et des permissions qui peuvent influencer la confiance des utilisateurs.

## Qu'est-ce qu'un token SPL

SPL signifie Solana Program Library. C'est le standard utilisé sur Solana pour créer et gérer des tokens.

Un token SPL peut être une memecoin, un token communautaire, un token de récompense, un token utilitaire ou un actif utilisé dans une dApp.

## Mint address : la vraie identité

La mint address est l'adresse unique du token sur la blockchain.

Le nom, le symbole et le logo peuvent être copiés. La mint address non.

Quand vous lancez un token, la mint address doit être visible partout : site officiel, Telegram, X/Twitter, DexScreener.

## Supply et décimales

La supply est la quantité totale de tokens créée.

Les décimales indiquent en combien de parties un token peut être divisé. Sur Solana, 9 décimales est le choix le plus courant.

## Métadonnées : la première impression

Les métadonnées comprennent le nom, le symbole, le logo, la description, le site web et les liens sociaux.

Un token sans logo ni liens officiels paraît improvisé.

## Authority

Les plus importantes sont la Mint Authority (créer de nouveaux tokens), la Freeze Authority (geler des wallets) et l'Update Authority (modifier les métadonnées).

Pour une memecoin, ces authorities sont très sensibles en termes de confiance.

## Conclusion

Un token SPL est simple à créer, mais ne doit pas être traité comme un détail technique. La mint address, la supply, les métadonnées et les authorities bien gérées vous donnent plus de crédibilité dès le départ.
` },
    PT: { title: "O que é um token SPL na Solana", desc: "Mint address, supply, metadata e authority explicados sem enrolação.", content: `
## Por que você precisa entender isso antes de criar um token

Na Solana, quase todos os tokens que você vê em carteiras, nos DEXs e no DexScreener são tokens SPL.

Criar um token é simples. Entender o que você está criando é a parte importante.

Um token não é apenas um nome com um logo. É um ativo registrado on-chain, com um mint address, uma supply, metadados e permissões que podem influenciar a confiança dos usuários.

## O que é um token SPL

SPL significa Solana Program Library. É o padrão usado na Solana para criar e gerenciar tokens.

Um token SPL pode ser uma memecoin, um token de comunidade, um token de recompensa, um token utilitário ou um ativo usado dentro de um dApp.

## Mint address: a identidade real

O mint address é o endereço único do token na blockchain.

Nome, símbolo e logo podem ser copiados. O mint address não.

Quando você lança um token, o mint address deve ser visível em todos os lugares: site oficial, Telegram, X/Twitter, DexScreener.

## Supply e decimais

A supply é a quantidade total de tokens criada. Os decimais indicam em quantas partes um token pode ser dividido. Na Solana, 9 decimais é o padrão comum.

## Metadados: a primeira impressão

Os metadados incluem nome, símbolo, logo, descrição, website e links sociais.

Um token sem logo, sem descrição e sem links oficiais parece improvisado.

## Authority

As mais importantes são a Mint Authority (criar novos tokens), a Freeze Authority (congelar carteiras) e a Update Authority (modificar metadados).

Para uma memecoin, essas authorities são muito sensíveis para a confiança.

## Conclusão

Um token SPL é simples de criar, mas não deve ser tratado como um detalhe técnico. Mint address, supply, metadados e authorities bem gerenciados dão mais credibilidade ao seu lançamento.
` },
    DE: { title: "Was ist ein SPL-Token auf Solana", desc: "Mint-Adresse, Supply, Metadaten und Authority einfach erklärt.", content: `
## Warum du das vor der Token-Erstellung verstehen musst

Auf Solana sind fast alle Token, die du in Wallets, auf DEXs und auf DexScreener siehst, SPL-Token.

Einen Token zu erstellen ist einfach. Zu verstehen, was du erstellst, ist der wichtige Teil.

Ein Token ist nicht nur ein Name mit einem Logo. Es ist ein on-chain registriertes Asset mit einer Mint-Adresse, einer Supply, Metadaten und Berechtigungen, die das Vertrauen der Nutzer beeinflussen können.

## Was ist ein SPL-Token

SPL steht für Solana Program Library. Es ist der Standard auf Solana zum Erstellen und Verwalten von Token.

Ein SPL-Token kann eine Memecoin, ein Community-Token, ein Reward-Token, ein Utility-Token oder ein in einer dApp verwendetes Asset sein.

## Mint-Adresse: die echte Identität

Die Mint-Adresse ist die eindeutige Adresse des Tokens auf der Blockchain.

Name, Symbol und Logo können kopiert werden. Die Mint-Adresse nicht.

Wenn du einen Token launchst, muss die Mint-Adresse überall sichtbar sein: offizielle Website, Telegram, X/Twitter, DexScreener.

## Supply und Dezimalstellen

Die Supply ist die Gesamtmenge der erstellten Token. Dezimalstellen geben an, in wie viele Teile ein Token aufgeteilt werden kann. Auf Solana sind 9 Dezimalstellen üblich.

## Metadaten: der erste Eindruck

Metadaten umfassen Name, Symbol, Logo, Beschreibung, Website und Social-Links.

Ein Token ohne Logo, ohne Beschreibung und ohne offizielle Links wirkt improvisiiert.

## Authority

Die wichtigsten sind die Mint Authority (neue Token erstellen), die Freeze Authority (Wallets einfrieren) und die Update Authority (Metadaten ändern).

Für eine Memecoin sind diese Authorities in Bezug auf Vertrauen sehr sensibel.

## Fazit

Ein SPL-Token ist einfach zu erstellen, sollte aber nicht als technisches Detail behandelt werden. Gut verwaltete Mint-Adresse, Supply, Metadaten und Authorities geben deinem Launch mehr Glaubwürdigkeit.
` },
  },
  "come-creare-token": {
    IT: { title: "Come creare un token Solana", desc: "La checklist pratica per creare un token SPL pronto al lancio." },
    EN: { title: "How to create a Solana token", desc: "The practical checklist to create a launch-ready SPL token.", content: `
## Creating the token is easy. Launching it well is not.

Today creating a Solana token takes a few minutes.

The problem is not the technical part. The problem is that many tokens are born without preparation: improvised logo, randomly chosen supply, authorities left active without reason, incomplete metadata, no strategy for liquidity or community.

The result is that the token looks unreliable before the first purchase.

## What to prepare first

Before creating the token, prepare everything:

1. Phantom or Solflare wallet
2. SOL for fees and operations
3. token name
4. symbol ticker
5. final logo
6. total supply
7. social links
8. decision on authorities
9. launch message
10. plan for the liquidity pool

## Name and ticker

The name must be easy to remember. The ticker should be short, readable, work well on DexScreener and not look copied.

Good examples: BONK, WIF, POPCAT, PIZZA
Weak examples: SUPERDOGEMEME2025, TOKEN123, names that are too long or confusing.

## Supply

Supply alone does not create value. A huge supply does not make the token cheap — it only makes the unit price smaller.

What matters is consistency with narrative, initial liquidity, distribution and community communication.

## Logo and metadata

The logo is one of the most important parts of the launch. It appears on wallets, DexScreener, Raydium, Jupiter, Telegram and X/Twitter.

A good logo must be readable small, recognizable, consistent with the name, suitable for dark backgrounds and memorable.

Metadata must be complete. A token without description, logo or official links looks abandoned.

## Authorities

The main ones are Mint Authority, Freeze Authority and Update Authority. These authorities influence trust.

Mint Authority allows creating new tokens after launch — if active, the community may fear future inflation.

Freeze Authority allows blocking specific wallets — for memecoins it is often seen as a strong risk.

Update Authority allows modifying metadata — many creators revoke it to show the token identity will not change.

## Creating the token with SolMint

1. connect your wallet
2. enter name and ticker
3. choose supply and decimals
4. upload logo and metadata
5. configure authorities
6. confirm the transaction
7. save the mint address

## After creation

The newly created token does not automatically have a market. To make it tradable you need a liquidity pool (TOKEN/SOL). Only after the pool can the token start appearing on Raydium, Jupiter, DexScreener and Birdeye.

## Common mistakes

Avoid: creating without community, copied logo, randomly chosen supply, empty socials, active authorities without explanation, hard-to-find mint address, too little liquidity, creator selling immediately, promises of guaranteed gains.

## Conclusion

Creating a Solana token is simple. The real difference lies in branding, trust, liquidity, community and launch quality.
` },
    ES: { title: "Cómo crear un token de Solana", desc: "La lista de verificación práctica para crear un token SPL listo para el lanzamiento.", content: `
## Crear el token es fácil. Lanzarlo bien no lo es.

Hoy crear un token de Solana lleva pocos minutos. El problema no es la parte técnica, sino que muchos tokens nacen sin preparación: logo improvisado, supply elegida al azar, authorities activas sin motivo, metadatos incompletos.

## Qué preparar antes

Antes de crear el token, prepara todo:

1. wallet Phantom o Solflare
2. SOL para fees
3. nombre del token
4. ticker símbolo
5. logo definitivo
6. supply total
7. redes sociales
8. decisión sobre authorities
9. mensaje de lanzamiento
10. plan para el pool de liquidez

## Nombre y ticker

El nombre debe ser fácil de recordar. El ticker debe ser corto, legible y no parecer copiado.

## Supply

La supply no crea valor por sí sola. Lo que importa es la coherencia con la narrativa, la liquidez inicial y la distribución.

## Logo y metadatos

El logo es una de las partes más importantes del lanzamiento. Debe ser legible pequeño, reconocible y coherente con el nombre.

Los metadatos deben estar completos: descripción, logo, enlaces oficiales.

## Authorities

Las principales son Mint Authority, Freeze Authority y Update Authority. Influyen directamente en la confianza de los usuarios.

## Después de la creación

El token recién creado no tiene mercado automáticamente. Para hacerlo negociable necesitas un pool de liquidez TOKEN/SOL.

## Conclusión

Crear un token de Solana es simple. La verdadera diferencia está en el branding, la confianza, la liquidez y la calidad del lanzamiento.
` },
    FR: { title: "Comment créer un token Solana", desc: "La checklist pratique pour créer un token SPL prêt au lancement.", content: `
## Créer le token est facile. Le lancer correctement ne l'est pas.

Aujourd'hui, créer un token Solana prend quelques minutes. Le problème n'est pas la partie technique, mais que beaucoup de tokens naissent sans préparation : logo improvisé, supply choisie au hasard, authorities laissées actives sans raison, métadonnées incomplètes.

## Ce qu'il faut préparer avant

Avant de créer le token, préparez tout :

1. portefeuille Phantom ou Solflare
2. SOL pour les frais
3. nom du token
4. symbole ticker
5. logo final
6. supply totale
7. liens sociaux
8. décision sur les authorities
9. message de lancement
10. plan pour le pool de liquidité

## Nom et ticker

Le nom doit être facile à retenir. Le ticker doit être court, lisible et ne pas sembler copié.

## Supply

La supply seule ne crée pas de valeur. Ce qui compte c'est la cohérence avec la narrative, la liquidité initiale et la distribution.

## Logo et métadonnées

Le logo est l'une des parties les plus importantes du lancement. Il doit être lisible en petit, reconnaissable et cohérent avec le nom.

## Authorities

Les principales sont Mint Authority, Freeze Authority et Update Authority. Elles influencent directement la confiance des utilisateurs.

## Après la création

Le token nouvellement créé n'a pas automatiquement de marché. Pour le rendre tradable, vous avez besoin d'un pool de liquidité TOKEN/SOL.

## Conclusion

Créer un token Solana est simple. La vraie différence réside dans le branding, la confiance, la liquidité et la qualité du lancement.
` },
    PT: { title: "Como criar um token Solana", desc: "O checklist prático para criar um token SPL pronto para o lançamento.", content: `
## Criar o token é fácil. Lançá-lo bem não é.

Hoje criar um token Solana leva alguns minutos. O problema não é a parte técnica, mas que muitos tokens nascem sem preparação: logo improvisado, supply escolhida aleatoriamente, authorities ativas sem motivo, metadados incompletos.

## O que preparar antes

Antes de criar o token, prepare tudo:

1. carteira Phantom ou Solflare
2. SOL para taxas
3. nome do token
4. símbolo ticker
5. logo definitivo
6. supply total
7. redes sociais
8. decisão sobre authorities
9. mensagem de lançamento
10. plano para o pool de liquidez

## Nome e ticker

O nome deve ser fácil de lembrar. O ticker deve ser curto, legível e não parecer copiado.

## Supply

A supply sozinha não cria valor. O que importa é a consistência com a narrativa, a liquidez inicial e a distribuição.

## Logo e metadados

O logo é uma das partes mais importantes do lançamento. Deve ser legível pequeno, reconhecível e consistente com o nome. Os metadados devem estar completos.

## Authorities

As principais são Mint Authority, Freeze Authority e Update Authority. Influenciam diretamente a confiança dos usuários.

## Após a criação

O token recém-criado não tem mercado automaticamente. Para torná-lo negociável você precisa de um pool de liquidez TOKEN/SOL.

## Conclusão

Criar um token Solana é simples. A verdadeira diferença está no branding, confiança, liquidez e qualidade do lançamento.
` },
    DE: { title: "Wie man einen Solana-Token erstellt", desc: "Die praktische Checkliste für einen startbereiten SPL-Token.", content: `
## Einen Token zu erstellen ist einfach. Ihn gut zu launchen nicht.

Heute dauert das Erstellen eines Solana-Tokens wenige Minuten. Das Problem ist nicht der technische Teil, sondern dass viele Token ohne Vorbereitung entstehen: improvisiertes Logo, zufällig gewählte Supply, ohne Grund aktive Authorities, unvollständige Metadaten.

## Was vorher vorzubereiten ist

Bevor du den Token erstellst, bereite alles vor:

1. Phantom oder Solflare Wallet
2. SOL für Gebühren
3. Token-Name
4. Ticker-Symbol
5. endgültiges Logo
6. Gesamtsupply
7. Social-Links
8. Entscheidung über Authorities
9. Launch-Nachricht
10. Plan für den Liquiditätspool

## Name und Ticker

Der Name muss leicht zu merken sein. Der Ticker sollte kurz, lesbar und nicht kopiert wirkend sein.

## Supply

Supply allein schafft keinen Wert. Was zählt ist Konsistenz mit der Narrative, der anfänglichen Liquidität und der Verteilung.

## Logo und Metadaten

Das Logo ist einer der wichtigsten Teile des Launches. Es muss auch klein lesbar, erkennbar und zum Namen passend sein. Metadaten müssen vollständig sein.

## Authorities

Die wichtigsten sind Mint Authority, Freeze Authority und Update Authority. Sie beeinflussen das Nutzervertrauen direkt.

## Nach der Erstellung

Der neu erstellte Token hat nicht automatisch einen Markt. Um ihn handelbar zu machen, braucht du einen Liquiditätspool TOKEN/SOL.

## Fazit

Einen Solana-Token zu erstellen ist einfach. Der echte Unterschied liegt in Branding, Vertrauen, Liquidität und Launch-Qualität.
` },
  },
  "revoke-authority": {
    IT: { title: "Cosa sono le Revoke Authority", desc: "Mint, Freeze e Update spiegate come le valuta davvero il mercato." },
    EN: { title: "What are Revoke Authorities", desc: "Mint, Freeze and Update explained the way the market actually evaluates them.", content: `
## Why authorities matter

When a token is created, some functions can remain under the creator's control. These functions are called authorities.

For an inexperienced user they look like technical details. For someone examining a token carefully, they are one of the first signals of risk or trust.

## Mint Authority

Mint Authority allows creating new tokens after launch.

If it remains active, the creator can increase the supply.

This is a very sensitive point. If users see that Mint Authority is still active, they may think: the supply can change, I could be diluted, the creator has too much control, the token is not really fixed supply.

For a memecoin, keeping Mint Authority active is almost always a trust problem.

## Freeze Authority

Freeze Authority allows freezing tokens in specific wallets. This means some holders might not be able to transfer or sell.

Even if the creator has no bad intentions, the mere presence of this authority can scare users.

## Update Authority

Update Authority allows modifying metadata — logo, description, links and some token-related data.

It can be useful to keep it to fix errors before the definitive launch. But after launch, many creators prefer to revoke it to show the token identity will not change.

## Revoking means losing control

Revoking an authority means giving up that power. It is a strong choice.

Advantages: increases trust, reduces doubts about supply, reduces perceived risk, makes the token more transparent.

Disadvantages: you cannot fix certain things, you cannot change metadata if you revoked Update, you cannot mint more tokens if you revoked Mint.

## When to revoke

For a classic memecoin, it often makes sense to revoke everything.

For a utility, gaming or dApp project, it may make sense to keep some authority for technical reasons. But the rule is simple: if you keep an authority, you must clearly explain why.

## How to communicate it

If you revoke authorities, communicate it clearly:
- Mint Authority revoked
- Freeze Authority revoked
- Metadata locked
- Supply fixed
- Official mint address published

## Conclusion

Revocations do not guarantee the success of a token. But they remove many doubts. In a market full of improvised tokens, well-managed authorities are a concrete advantage.
` },
    ES: { title: "Qué son las Revoke Authority", desc: "Mint, Freeze y Update explicados como los evalúa realmente el mercado.", content: `
## Por qué importan las authorities

Cuando se crea un token, algunas funciones pueden permanecer bajo el control del creador. Para alguien que examina un token con atención, son una de las primeras señales de riesgo o confianza.

## Mint Authority

La Mint Authority permite crear nuevos tokens después del lanzamiento. Si sigue activa, el creador puede aumentar la supply. Para una memecoin, mantener la Mint Authority activa es casi siempre un problema de confianza.

## Freeze Authority

La Freeze Authority permite congelar tokens en wallets específicas. Incluso si el creador no tiene malas intenciones, la sola presencia de esta authority puede asustar a los usuarios.

## Update Authority

La Update Authority permite modificar metadatos: logo, descripción, enlaces. Puede ser útil antes del lanzamiento definitivo, pero después muchos creadores prefieren revocarla.

## Revocar significa perder control

Ventajas: aumenta la confianza, reduce dudas sobre la supply, reduce el riesgo percibido.

Desventajas: no puedes corregir ciertas cosas, no puedes cambiar metadatos si revocaste Update, no puedes crear más tokens si revocaste Mint.

## Cuándo revocar

Para una memecoin clásica, a menudo tiene sentido revocar todo. Para proyectos utility o gaming puede tener sentido mantener alguna authority, pero debes explicar claramente por qué.

## Conclusión

Las revocaciones no garantizan el éxito de un token, pero eliminan muchas dudas. En un mercado lleno de tokens improvisados, las authorities bien gestionadas son una ventaja concreta.
` },
    FR: { title: "Que sont les Revoke Authorities", desc: "Mint, Freeze et Update expliqués comme le marché les évalue vraiment.", content: `
## Pourquoi les authorities sont importantes

Quand un token est créé, certaines fonctions peuvent rester sous le contrôle du créateur. Pour quelqu'un qui examine un token attentivement, ce sont l'un des premiers signaux de risque ou de confiance.

## Mint Authority

La Mint Authority permet de créer de nouveaux tokens après le lancement. Si elle reste active, le créateur peut augmenter la supply. Pour une memecoin, garder la Mint Authority active est presque toujours un problème de confiance.

## Freeze Authority

La Freeze Authority permet de geler des tokens dans des portefeuilles spécifiques. Même si le créateur n'a pas de mauvaises intentions, la simple présence de cette authority peut effrayer les utilisateurs.

## Update Authority

L'Update Authority permet de modifier les métadonnées. Elle peut être utile avant le lancement définitif, mais après le lancement beaucoup de créateurs préfèrent la révoquer.

## Révoquer signifie perdre le contrôle

Avantages : augmente la confiance, réduit les doutes sur la supply, réduit le risque perçu.

Inconvénients : vous ne pouvez pas corriger certaines choses, changer les métadonnées ou créer plus de tokens après révocation.

## Conclusion

Les révocations ne garantissent pas le succès d'un token, mais elles suppriment beaucoup de doutes. Dans un marché plein de tokens improvisés, des authorities bien gérées sont un avantage concret.
` },
    PT: { title: "O que são as Revoke Authorities", desc: "Mint, Freeze e Update explicados como o mercado realmente os avalia.", content: `
## Por que as authorities importam

Quando um token é criado, algumas funções podem permanecer sob o controle do criador. Para quem examina um token com atenção, são um dos primeiros sinais de risco ou confiança.

## Mint Authority

A Mint Authority permite criar novos tokens após o lançamento. Se permanecer ativa, o criador pode aumentar a supply. Para uma memecoin, manter a Mint Authority ativa é quase sempre um problema de confiança.

## Freeze Authority

A Freeze Authority permite congelar tokens em carteiras específicas. Mesmo que o criador não tenha más intenções, a simples presença dessa authority pode assustar os usuários.

## Update Authority

A Update Authority permite modificar metadados. Pode ser útil antes do lançamento definitivo, mas depois muitos criadores preferem revogá-la.

## Revogar significa perder controle

Vantagens: aumenta a confiança, reduz dúvidas sobre a supply, reduz o risco percebido.

Desvantagens: não é possível corrigir certas coisas, alterar metadados ou criar mais tokens após a revogação.

## Conclusão

As revogações não garantem o sucesso de um token, mas removem muitas dúvidas. Em um mercado cheio de tokens improvisados, authorities bem gerenciadas são uma vantagem concreta.
` },
    DE: { title: "Was sind Revoke Authorities", desc: "Mint, Freeze und Update erklärt – so bewertet der Markt sie wirklich.", content: `
## Warum Authorities wichtig sind

Wenn ein Token erstellt wird, können einige Funktionen unter der Kontrolle des Erstellers bleiben. Für jemanden, der einen Token genau untersucht, sind sie eines der ersten Risiko- oder Vertrauenssignale.

## Mint Authority

Die Mint Authority erlaubt das Erstellen neuer Token nach dem Launch. Wenn sie aktiv bleibt, kann der Ersteller die Supply erhöhen. Für eine Memecoin ist eine aktive Mint Authority fast immer ein Vertrauensproblem.

## Freeze Authority

Die Freeze Authority erlaubt das Einfrieren von Token in bestimmten Wallets. Selbst wenn der Ersteller keine bösen Absichten hat, kann die bloße Existenz dieser Authority Nutzer abschrecken.

## Update Authority

Die Update Authority erlaubt das Ändern von Metadaten. Sie kann vor dem endgültigen Launch nützlich sein, aber danach widerrufen viele Ersteller sie.

## Widerrufen bedeutet Kontrolle verlieren

Vorteile: erhöht Vertrauen, reduziert Zweifel über Supply, reduziert wahrgenommenes Risiko.

Nachteile: du kannst bestimmte Dinge nicht mehr korrigieren oder ändern.

## Fazit

Widerrufe garantieren keinen Token-Erfolg, aber sie beseitigen viele Zweifel. In einem Markt voller improvisierter Token sind gut verwaltete Authorities ein konkreter Vorteil.
` },
  },
  "liquidity-pool-raydium": {
    IT: { title: "Come aggiungere liquidità su Raydium", desc: "Come rendere tradabile un token e scegliere una pool sensata." },
    EN: { title: "How to add liquidity on Raydium", desc: "How to make a token tradable and choose a sensible pool.", content: `
## Why liquidity is needed

A newly created token exists on-chain, but does not automatically have a market. To allow users to buy and sell it, you need a liquidity pool. The most common pool on Solana is TOKEN/SOL.

Without a pool, the token can be sent between wallets, but is not easily tradable.

## What is a liquidity pool

A liquidity pool is a reserve of two assets deposited in a smart contract. In the TOKEN/SOL case, you deposit a quantity of your token and a quantity of SOL. The ratio between these two assets creates the initial price.

## Initial price

The initial price depends on how much token and how much SOL you deposit.

Simple example: 500,000,000 tokens and 1 SOL. That ratio determines the theoretical initial price.

If you deposit more SOL relative to tokens, the initial price will be higher. If you deposit many tokens and little SOL, the initial price will be lower.

## What to prepare first

Before creating the pool, make sure you have: the correct mint address, token in your wallet, SOL for liquidity, extra SOL for fees, logo and metadata already set up, public official links, a message for the community.

Do not create the pool if the token is not ready to be seen.

## Creating the pool

General process:
1. open Raydium
2. go to the liquidity section
3. choose create pool
4. paste the mint address
5. choose SOL as the second asset
6. enter token quantity
7. enter SOL quantity
8. check the ratio
9. confirm with Phantom

## Low liquidity

With low liquidity: price moves very easily, slippage can be high, small purchases can pump the chart, small sales can destroy it, perceived risk is high.

## Higher liquidity

With more liquidity: price is more stable, token looks more serious, users have more trust, easier to sustain volume.

## Removing liquidity

Removing liquidity is possible, but is one of the most delicate actions. If the community sees liquidity disappear, it can interpret it as a rug pull. Communicate clearly before doing it.

## Conclusion

The liquidity pool is the moment when the token goes from a created asset to a tradable token. It is one of the most important steps of the launch. Prepare it carefully, because it influences price, trust, volume and project perception.
` },
    ES: { title: "Cómo añadir liquidez en Raydium", desc: "Cómo hacer tradeable un token y elegir un pool sensato.", content: `
## Por qué se necesita liquidez

Un token recién creado existe on-chain, pero no tiene automáticamente un mercado. Para permitir a los usuarios comprarlo y venderlo, necesitas un pool de liquidez. El más común en Solana es TOKEN/SOL.

## Qué es un pool de liquidez

Un pool de liquidez es una reserva de dos activos depositados en un smart contract. En el caso TOKEN/SOL depositas una cantidad de tu token y una cantidad de SOL. La relación entre estos dos activos crea el precio inicial.

## Precio inicial

El precio inicial depende de cuánto token y cuánto SOL depositas. Si depositas más SOL relativo a tokens, el precio inicial será más alto. Si depositas muchos tokens y poco SOL, el precio inicial será más bajo.

## Crear el pool

Proceso general en Raydium:
1. abre Raydium, ve a liquidez
2. elige crear pool
3. pega la mint address
4. elige SOL como segundo activo
5. ingresa cantidades
6. confirma con Phantom

## Liquidez baja vs alta

Con liquidez baja el precio se mueve fácilmente, el slippage puede ser alto. Con más liquidez el precio es más estable y el token parece más serio.

## Eliminar liquidez

Eliminar liquidez es posible, pero delicado. Si la comunidad ve desaparecer la liquidez, puede interpretarlo como rug pull. Comunícalo claramente.

## Conclusión

El pool de liquidez es el momento en que el token pasa de activo creado a token negociable. Prepáralo con cuidado.
` },
    FR: { title: "Comment ajouter de la liquidité sur Raydium", desc: "Comment rendre un token tradable et choisir un pool sensé.", content: `
## Pourquoi la liquidité est nécessaire

Un token nouvellement créé existe on-chain, mais n'a pas automatiquement de marché. Pour permettre aux utilisateurs de l'acheter et de le vendre, vous avez besoin d'un pool de liquidité. Le plus courant sur Solana est TOKEN/SOL.

## Qu'est-ce qu'un pool de liquidité

Un pool de liquidité est une réserve de deux actifs déposés dans un smart contract. Dans le cas TOKEN/SOL, vous déposez une quantité de votre token et une quantité de SOL. Le ratio entre ces deux actifs crée le prix initial.

## Prix initial

Le prix initial dépend de la quantité de tokens et de SOL que vous déposez. Plus de SOL par rapport aux tokens = prix initial plus élevé.

## Créer le pool sur Raydium

1. ouvrez Raydium, allez dans la section liquidité
2. choisissez créer un pool
3. collez la mint address
4. choisissez SOL comme second actif
5. entrez les quantités
6. confirmez avec Phantom

## Liquidité faible vs élevée

Faible liquidité : prix très volatile, slippage élevé. Liquidité plus élevée : prix plus stable, token paraît plus sérieux.

## Supprimer la liquidité

Supprimer la liquidité est possible, mais délicat. Si la communauté voit disparaître la liquidité, elle peut l'interpréter comme un rug pull.

## Conclusion

Le pool de liquidité est le moment où le token passe d'un actif créé à un token tradable. C'est l'une des étapes les plus importantes du lancement.
` },
    PT: { title: "Como adicionar liquidez no Raydium", desc: "Como tornar um token negociável e escolher um pool sensato.", content: `
## Por que a liquidez é necessária

Um token recém-criado existe on-chain, mas não tem automaticamente um mercado. Para permitir que os usuários o comprem e vendam, você precisa de um pool de liquidez. O mais comum na Solana é TOKEN/SOL.

## O que é um pool de liquidez

Um pool de liquidez é uma reserva de dois ativos depositados em um smart contract. No caso TOKEN/SOL você deposita uma quantidade do seu token e uma quantidade de SOL. A relação entre esses dois ativos cria o preço inicial.

## Criar o pool no Raydium

1. abra o Raydium, vá para a seção de liquidez
2. escolha criar pool
3. cole o mint address
4. escolha SOL como segundo ativo
5. insira as quantidades
6. confirme com Phantom

## Liquidez baixa vs alta

Com liquidez baixa o preço se move facilmente e o slippage pode ser alto. Com mais liquidez o preço é mais estável e o token parece mais sério.

## Remover liquidez

Remover liquidez é possível, mas é delicado. Se a comunidade vir a liquidez desaparecer, pode interpretá-lo como rug pull.

## Conclusão

O pool de liquidez é o momento em que o token passa de ativo criado para token negociável. É uma das etapas mais importantes do lançamento.
` },
    DE: { title: "Wie man Liquidität auf Raydium hinzufügt", desc: "Wie man einen Token handelbar macht und einen sinnvollen Pool wählt.", content: `
## Warum Liquidität benötigt wird

Ein neu erstellter Token existiert on-chain, hat aber nicht automatisch einen Markt. Um Nutzern den Kauf und Verkauf zu ermöglichen, braucht du einen Liquiditätspool. Der häufigste auf Solana ist TOKEN/SOL.

## Was ist ein Liquiditätspool

Ein Liquiditätspool ist eine Reserve aus zwei Assets in einem Smart Contract. Im TOKEN/SOL-Fall hinterlegst du eine Menge deines Tokens und eine Menge SOL. Das Verhältnis bestimmt den Anfangspreis.

## Pool auf Raydium erstellen

1. Raydium öffnen, zum Liquiditätsbereich gehen
2. Pool erstellen wählen
3. Mint-Adresse einfügen
4. SOL als zweites Asset wählen
5. Mengen eingeben
6. mit Phantom bestätigen

## Niedrige vs hohe Liquidität

Niedrige Liquidität: Preis bewegt sich leicht, hoher Slippage. Höhere Liquidität: stabilerer Preis, Token wirkt seriöser.

## Liquidität entfernen

Das Entfernen von Liquidität ist möglich, aber heikel. Wenn die Community die Liquidität verschwinden sieht, kann sie es als Rug Pull interpretieren.

## Fazit

Der Liquiditätspool ist der Moment, in dem der Token von einem erstellten Asset zu einem handelbaren Token wird. Es ist einer der wichtigsten Schritte beim Launch.
` },
  },
  "dexscreener-listing": {
    IT: { title: "Come apparire su DexScreener", desc: "Cosa serve per essere indicizzati e sembrare affidabili." },
    EN: { title: "How to appear on DexScreener", desc: "What it takes to get indexed and look trustworthy.", content: `
## DexScreener is not magic

DexScreener shows tokens that have activity on supported DEXs. You need a pool, real activity and readable data.

## What you really need

To appear well you need: an active pool, liquidity, volume, readable metadata, logo, clear name and symbol, social links, correct mint address.

## Timing

After creating the pool, indexing times can vary. Raydium usually works almost immediately. DexScreener can index within minutes. Jupiter may take longer.

## What users look at

When a token appears on DexScreener, users immediately look at: market cap, volume, liquidity, price change, pool age, recent transactions, logo, socials, holders, authorities.

A token without a logo or socials can be ignored even if it is generating volume.

## Better profile

To improve perception: use a clear logo, publish official links, keep Telegram active, share the mint address, avoid copied names, explain supply and authorities.

## Errors to avoid

Avoid: empty socials, broken links, missing logo, no description, promises like 100x guaranteed, names too similar to famous tokens, mint address not published.

## Conclusion

Appearing on DexScreener is useful, but not enough. The real question is: when users arrive on the chart, do they find a well-crafted project or an improvised token?
` },
    ES: { title: "Cómo aparecer en DexScreener", desc: "Qué se necesita para ser indexado y parecer confiable.", content: `
## DexScreener no es magia

DexScreener muestra tokens que tienen actividad en DEX compatibles. Necesitas un pool, actividad real y datos legibles.

## Lo que realmente necesitas

Para aparecer bien necesitas: pool activo, liquidez, volumen, metadatos legibles, logo, nombre y símbolo claros, redes sociales, mint address correcta.

## Tiempos

Después de crear el pool, los tiempos de indexación pueden variar. Raydium suele funcionar casi de inmediato. DexScreener puede indexar en minutos.

## Qué miran los usuarios

Los usuarios miran: market cap, volumen, liquidez, variación de precio, edad del pool, transacciones recientes, logo, redes sociales, holders, authorities.

## Errores a evitar

Evita: redes sociales vacías, enlaces rotos, logo faltante, sin descripción, promesas de 100x garantizado, mint address no publicada.

## Conclusión

Aparecer en DexScreener es útil, pero no suficiente. La pregunta real es: cuando los usuarios llegan al gráfico, ¿encuentran un proyecto cuidado o un token improvisado?
` },
    FR: { title: "Comment apparaître sur DexScreener", desc: "Ce qu'il faut pour être indexé et paraître fiable.", content: `
## DexScreener n'est pas magique

DexScreener montre les tokens qui ont de l'activité sur les DEX supportés. Vous avez besoin d'un pool, d'une activité réelle et de données lisibles.

## Ce dont vous avez vraiment besoin

Pour apparaître correctement : pool actif, liquidité, volume, métadonnées lisibles, logo, nom et symbole clairs, liens sociaux, mint address correcte.

## Ce que les utilisateurs regardent

Ils regardent : market cap, volume, liquidité, variation de prix, âge du pool, transactions récentes, logo, réseaux sociaux, holders, authorities.

## Erreurs à éviter

Évitez : réseaux sociaux vides, liens brisés, logo manquant, pas de description, promesses de 100x garanti, mint address non publiée.

## Conclusion

Apparaître sur DexScreener est utile, mais pas suffisant. La vraie question est : quand les utilisateurs arrivent sur le graphique, trouvent-ils un projet soigné ou un token improvisé?
` },
    PT: { title: "Como aparecer no DexScreener", desc: "O que é preciso para ser indexado e parecer confiável.", content: `
## DexScreener não é mágica

O DexScreener mostra tokens que têm atividade em DEXs suportados. Você precisa de um pool, atividade real e dados legíveis.

## O que você realmente precisa

Para aparecer bem: pool ativo, liquidez, volume, metadados legíveis, logo, nome e símbolo claros, links sociais, mint address correto.

## O que os usuários olham

Eles olham: market cap, volume, liquidez, variação de preço, idade do pool, transações recentes, logo, redes sociais, holders, authorities.

## Erros a evitar

Evite: redes sociais vazias, links quebrados, logo ausente, sem descrição, promessas de 100x garantido, mint address não publicado.

## Conclusão

Aparecer no DexScreener é útil, mas não suficiente. A pergunta real é: quando os usuários chegam ao gráfico, encontram um projeto bem cuidado ou um token improvisado?
` },
    DE: { title: "Wie man auf DexScreener erscheint", desc: "Was nötig ist, um indexiert zu werden und vertrauenswürdig auszusehen.", content: `
## DexScreener ist keine Magie

DexScreener zeigt Token, die Aktivität auf unterstützten DEXs haben. Du brauchst einen Pool, echte Aktivität und lesbare Daten.

## Was du wirklich brauchst

Um gut zu erscheinen: aktiver Pool, Liquidität, Volumen, lesbare Metadaten, Logo, klarer Name und Symbol, Social-Links, korrekte Mint-Adresse.

## Was Nutzer anschauen

Sie schauen auf: Market Cap, Volumen, Liquidität, Preisveränderung, Pool-Alter, aktuelle Transaktionen, Logo, Socials, Holder, Authorities.

## Fehler zu vermeiden

Vermeide: leere Socials, defekte Links, fehlendes Logo, keine Beschreibung, Versprechen wie 100x garantiert, nicht veröffentlichte Mint-Adresse.

## Fazit

Auf DexScreener zu erscheinen ist nützlich, aber nicht genug. Die echte Frage ist: Wenn Nutzer auf den Chart kommen, finden sie ein gepflegtes Projekt oder einen improvisierten Token?
` },
  },
  "token-di-successo": {
    IT: { title: "Come fare un token meme di successo", desc: "Branding, community, timing e fiducia spiegati senza hype." },
    EN: { title: "How to make a successful meme token", desc: "Branding, community, timing and trust explained without the hype.", content: `
## The technical part is not enough

Creating a token is easy. Creating attention is hard.

A memecoin does not sell just technology. It sells identity, meme, belonging, timing, community energy and minimum trust.

If the token communicates nothing, it will die even if technically perfect.

## The concept

A good meme token is understood in a few seconds. If you have to explain too much, the concept is weak.

What works well: simple mascots, memorable names, clear cultural references, immediate humor, strong visual, easy-to-repeat narrative.

A good test: can someone understand it from a card on DexScreener without reading a whitepaper?

## The logo

The logo is more important than many think. It appears everywhere: wallet, DexScreener, Telegram, X, Raydium, Jupiter.

It must work small, on dark background and among dozens of other tokens. A weak logo reduces clicks.

## Community before the pool

Launching with nobody ready is one of the most common mistakes.

Before the pool you should have: Telegram, X/Twitter, first memes, pinned message, official mint address, supply explained, community basic rules, at least a small real group.

Even 30 real people are worth more than fake numbers.

## Timing

A token can be technically good but launched at the wrong moment.

Before launching look at: what is trending, which narratives are saturated, what type of token is generating volume, what mood the market has.

## Trust

In the meme market nobody trusts immediately. To reduce doubts: revoke authorities when it makes sense, share the mint address, do not promise gains, stay present after launch.

## Mistakes that kill a launch

Avoid: copied logo, confusing presales, empty socials, creator selling immediately, unclear mint address, active freeze authority, aggressive promises, abandoned Telegram, liquidity removed without explanation.

## Conclusion

A successful meme token is born from the combination of a simple idea, active community, right timing and sufficient trust.
` },
    ES: { title: "Cómo hacer un token meme exitoso", desc: "Branding, comunidad, timing y confianza explicados sin hype.", content: `
## La parte técnica no es suficiente

Crear un token es fácil. Crear atención es difícil. Una memecoin vende identidad, meme, pertenencia, timing y energía de comunidad.

## El concepto

Un buen token meme se entiende en pocos segundos. Lo que funciona bien: mascotas simples, nombres memorables, referencias culturales claras, humor inmediato, visual fuerte.

## El logo

Debe funcionar pequeño, sobre fondo oscuro y entre docenas de otros tokens. Un logo débil reduce los clics.

## Comunidad antes del pool

Antes del pool deberías tener: Telegram, X/Twitter, primeros memes, mensaje fijado, mint address oficial, supply explicada, al menos un pequeño grupo real.

## Timing

Antes de lanzar mira qué está en tendencia, qué narrativas están saturadas y qué tipo de token está generando volumen.

## Confianza

Para reducir dudas: revoca authorities cuando tenga sentido, comparte la mint address, no prometas ganancias, permanece presente tras el lanzamiento.

## Conclusión

Un token meme exitoso nace de la combinación de idea simple, comunidad activa, timing correcto y suficiente confianza.
` },
    FR: { title: "Comment créer un token mème réussi", desc: "Branding, communauté, timing et confiance expliqués sans hype.", content: `
## La partie technique ne suffit pas

Créer un token est facile. Créer de l'attention est difficile. Une memecoin vend de l'identité, du mème, de l'appartenance, du timing et de l'énergie communautaire.

## Le concept

Un bon token mème se comprend en quelques secondes. Ce qui fonctionne bien : mascottes simples, noms mémorables, références culturelles claires, humour immédiat, visuel fort.

## Le logo

Il doit fonctionner en petit, sur fond sombre et parmi des dizaines d'autres tokens. Un logo faible réduit les clics.

## Communauté avant le pool

Avant le pool vous devriez avoir : Telegram, X/Twitter, premiers mèmes, message épinglé, mint address officielle, supply expliquée, au moins un petit groupe réel.

## Timing

Avant de lancer, regardez ce qui est en tendance et quel type de token génère du volume.

## Conclusion

Un token mème réussi naît de la combinaison d'une idée simple, d'une communauté active, d'un timing juste et d'une confiance suffisante.
` },
    PT: { title: "Como fazer um token meme de sucesso", desc: "Branding, comunidade, timing e confiança explicados sem hype.", content: `
## A parte técnica não é suficiente

Criar um token é fácil. Criar atenção é difícil. Uma memecoin vende identidade, meme, pertencimento, timing e energia da comunidade.

## O conceito

Um bom token meme é entendido em poucos segundos. O que funciona bem: mascotes simples, nomes memoráveis, referências culturais claras, humor imediato, visual forte.

## O logo

Deve funcionar pequeno, em fundo escuro e entre dezenas de outros tokens. Um logo fraco reduz os cliques.

## Comunidade antes do pool

Antes do pool você deve ter: Telegram, X/Twitter, primeiros memes, mensagem fixada, mint address oficial, supply explicada, pelo menos um pequeno grupo real.

## Timing

Antes de lançar, veja o que está em tendência e que tipo de token está gerando volume.

## Conclusão

Um token meme de sucesso nasce da combinação de ideia simples, comunidade ativa, timing certo e confiança suficiente.
` },
    DE: { title: "Wie man einen erfolgreichen Meme-Token macht", desc: "Branding, Community, Timing und Vertrauen ohne Hype erklärt.", content: `
## Der technische Teil reicht nicht

Einen Token zu erstellen ist einfach. Aufmerksamkeit zu erzeugen ist schwer. Eine Memecoin verkauft Identität, Meme, Zugehörigkeit, Timing und Community-Energie.

## Das Konzept

Ein guter Meme-Token wird in wenigen Sekunden verstanden. Was gut funktioniert: einfache Maskottchen, einprägsame Namen, klare Kulturreferenzen, sofortiger Humor, starke Visuals.

## Das Logo

Es muss klein funktionieren, auf dunklem Hintergrund und inmitten von Dutzenden anderer Token. Ein schwaches Logo reduziert Klicks.

## Community vor dem Pool

Vor dem Pool solltest du haben: Telegram, X/Twitter, erste Memes, gepinnter Message, offizielle Mint-Adresse, erklärte Supply, mindestens eine kleine echte Gruppe.

## Fazit

Ein erfolgreicher Meme-Token entsteht aus der Kombination einer einfachen Idee, einer aktiven Community, dem richtigen Timing und ausreichend Vertrauen.
` },
  },
  "scam-vs-legit": {
    IT: { title: "Token legit vs scam — come riconoscerli", desc: "Controlli pratici da fare prima di comprare o lanciare." },
    EN: { title: "Legit vs scam tokens — how to spot them", desc: "Practical checks to do before buying or launching.", content: `
## No perfect check exists

On Solana, many tokens are created every day. Some are real projects. Some are experiments. Others are scams. You need to look at multiple signals together.

## Authorities

Always check Mint Authority, Freeze Authority and Update Authority.

Mint active means new tokens can be created. Freeze active means some wallets could be frozen. Update active means metadata and logo could change.

For a memecoin, active Mint and Freeze are very sensitive signals.

## Holders

Look at the distribution. If a few wallets control a large portion of the supply, the risk is higher. Check top holders, creator wallet, percentage held and recent movements.

## Liquidity

Very low liquidity means: fragile price, high slippage, dangerous heavy sales, market easy to manipulate. If liquidity suddenly disappears, the token can become almost untradable.

## Socials

Look at: active Telegram, updated X/Twitter, clear messages, published mint address, real community, team responses. Be wary of communities full of bots.

## Promises

Aggressive promises are a red flag: "100x guaranteed", "cannot go down", "insider call", "fixed return", "guaranteed buyback". Nobody can guarantee the future price of a memecoin.

## Useful tools

You can check with: Solscan, DexScreener, RugCheck, Birdeye. No single tool is enough — compare multiple sources.

## Conclusion

A more reliable token usually has: explained or revoked authorities, visible liquidity, less concentrated holders, real socials, well-crafted metadata, clear communication.
` },
    ES: { title: "Tokens legit vs scam — cómo reconocerlos", desc: "Controles prácticos a hacer antes de comprar o lanzar.", content: `
## No existe un control perfecto

En Solana nacen muchos tokens cada día. Algunos son proyectos reales, otros son experimentos, otros son estafas. Necesitas mirar múltiples señales juntas.

## Authorities

Comprueba siempre Mint Authority, Freeze Authority y Update Authority. Mint activa puede aumentar la supply. Freeze activa puede bloquear wallets. Update activa puede cambiar los metadatos.

## Holders

Mira la distribución. Si pocas wallets controlan una gran parte de la supply, el riesgo es mayor.

## Liquidez

Liquidez muy baja significa precio frágil, alto slippage, mercado fácil de manipular.

## Redes sociales

Busca: Telegram activo, X/Twitter actualizado, mensajes claros, mint address publicada, comunidad real.

## Promesas

Las promesas agresivas son una señal de alerta: "100x garantizado", "no puede bajar", "rendimiento fijo".

## Herramientas útiles

Puedes verificar con: Solscan, DexScreener, RugCheck, Birdeye.

## Conclusión

Un token más confiable suele tener: authorities explicadas o revocadas, liquidez visible, holders menos concentrados, redes sociales reales, metadatos cuidados.
` },
    FR: { title: "Tokens légitimes vs scams — comment les reconnaître", desc: "Vérifications pratiques à faire avant d'acheter ou de lancer.", content: `
## Aucune vérification parfaite n'existe

Sur Solana, de nombreux tokens sont créés chaque jour. Certains sont de vrais projets, d'autres des expériences, d'autres des arnaques. Vous devez regarder plusieurs signaux ensemble.

## Authorities

Vérifiez toujours Mint Authority, Freeze Authority et Update Authority. Mint active peut augmenter la supply. Freeze active peut bloquer des wallets. Update active peut changer les métadonnées.

## Holders

Regardez la distribution. Si peu de wallets contrôlent une grande partie de la supply, le risque est plus élevé.

## Liquidité

Liquidité très faible signifie : prix fragile, slippage élevé, marché facile à manipuler.

## Réseaux sociaux

Cherchez : Telegram actif, X/Twitter mis à jour, messages clairs, mint address publiée, vraie communauté.

## Promesses

Les promesses agressives sont un signal d'alarme : "100x garanti", "ne peut pas descendre", "rendement fixe".

## Conclusion

Un token plus fiable a généralement : authorities expliquées ou révoquées, liquidité visible, holders moins concentrés, vrais réseaux sociaux, métadonnées soignées.
` },
    PT: { title: "Tokens legit vs scam — como reconhecê-los", desc: "Verificações práticas a fazer antes de comprar ou lançar.", content: `
## Nenhuma verificação perfeita existe

Na Solana, muitos tokens são criados a cada dia. Alguns são projetos reais, outros experimentos, outros golpes. Você precisa olhar múltiplos sinais juntos.

## Authorities

Sempre verifique Mint Authority, Freeze Authority e Update Authority. Mint ativa pode aumentar a supply. Freeze ativa pode bloquear carteiras. Update ativa pode mudar os metadados.

## Holders

Observe a distribuição. Se poucas carteiras controlam grande parte da supply, o risco é maior.

## Liquidez

Liquidez muito baixa significa: preço frágil, alto slippage, mercado fácil de manipular.

## Redes sociais

Procure: Telegram ativo, X/Twitter atualizado, mensagens claras, mint address publicado, comunidade real.

## Ferramentas úteis

Você pode verificar com: Solscan, DexScreener, RugCheck, Birdeye.

## Conclusão

Um token mais confiável geralmente tem: authorities explicadas ou revogadas, liquidez visível, holders menos concentrados, redes sociais reais, metadados bem cuidados.
` },
    DE: { title: "Legit vs Scam-Token — wie man sie erkennt", desc: "Praktische Prüfungen vor dem Kauf oder Launch.", content: `
## Keine perfekte Prüfung existiert

Auf Solana werden jeden Tag viele Token erstellt. Einige sind echte Projekte, andere Experimente, andere Scams. Du musst mehrere Signale zusammen betrachten.

## Authorities

Prüfe immer Mint Authority, Freeze Authority und Update Authority. Aktive Mint kann Supply erhöhen. Aktive Freeze kann Wallets einfrieren. Aktive Update kann Metadaten ändern.

## Holder

Schau auf die Verteilung. Wenn wenige Wallets einen großen Teil der Supply kontrollieren, ist das Risiko höher.

## Liquidität

Sehr niedrige Liquidität bedeutet: fragiler Preis, hoher Slippage, leicht manipulierbarer Markt.

## Nützliche Tools

Du kannst mit Solscan, DexScreener, RugCheck und Birdeye prüfen.

## Fazit

Ein zuverlässigerer Token hat meist: erklärte oder widerrufene Authorities, sichtbare Liquidität, weniger konzentrierte Holder, echte Socials, gepflegte Metadaten.
` },
  },
  "phantom-wallet-guida": {
    IT: { title: "Phantom Wallet — guida completa", desc: "Setup, sicurezza e buone pratiche per usare Solana." },
    EN: { title: "Phantom Wallet — complete guide", desc: "Setup, security and best practices for using Solana.", content: `
## What is Phantom

Phantom is one of the most used wallets on Solana. It allows you to: receive SOL, manage SPL tokens, connect to dApps, sign transactions, view NFTs and assets, use DeFi and DEXs.

It is non-custodial. That means you control the wallet.

## Safe installation

Download Phantom only from the official website or official stores. Avoid: DM links, suspicious ads, copied sites, extensions with similar names, downloads from random pages.

Many scams imitate wallets and dApps to steal seed phrases.

## Seed phrase

The seed phrase controls the wallet. Whoever has the seed phrase can control the funds.

Rules: do not photograph it, do not save it on cloud, do not send it in chats, do not enter it on websites, store it offline, never share it.

No legitimate service will ever ask for your seed phrase.

## Connecting the wallet

When you connect Phantom to a dApp, the site can see your public address. It cannot take funds without a signature, but you still need to check what you approve.

Connecting the wallet is not the same as signing a transaction.

## Signing transactions

Before signing: check the domain, read what Phantom shows, verify amounts and tokens, do not sign messages you do not understand, avoid rushing.

Many scams work because the user signs without reading.

## Best practices

- keep a main wallet separate from test wallets
- do not connect your main wallet to suspicious sites
- always check the URL
- use little SOL on risky wallets
- revoke unnecessary connections
- do not sign when you are in a hurry

## Conclusion

Phantom is easy to use, but security depends a lot on you. The main rule: never share your seed phrase and never sign transactions you do not understand.
` },
    ES: { title: "Phantom Wallet — guía completa", desc: "Configuración, seguridad y buenas prácticas para usar Solana.", content: `
## Qué es Phantom

Phantom es una de las wallets más usadas en Solana. Permite recibir SOL, gestionar tokens SPL, conectarse a dApps, firmar transacciones y usar DeFi y DEX. Es non-custodial — tú controlas la wallet.

## Instalación segura

Descarga Phantom solo desde el sitio oficial o tiendas oficiales. Evita: enlaces recibidos por DM, anuncios sospechosos, extensiones con nombres similares.

## Seed phrase

La seed phrase controla la wallet. Quien la tenga puede controlar los fondos. Nunca la fotografíes, guardes en la nube, envíes por chat ni ingreses en sitios web. Ningún servicio legítimo te la pedirá.

## Conectar la wallet

Conectar la wallet no es lo mismo que firmar una transacción. El sitio puede ver tu dirección pública pero no puede tomar fondos sin tu firma.

## Firmar transacciones

Antes de firmar: verifica el dominio, lee lo que muestra Phantom, evita la prisa. Muchas estafas funcionan porque el usuario firma sin leer.

## Conclusión

La regla principal: nunca compartas tu seed phrase y nunca firmes transacciones que no entiendes.
` },
    FR: { title: "Phantom Wallet — guide complet", desc: "Configuration, sécurité et bonnes pratiques pour utiliser Solana.", content: `
## Qu'est-ce que Phantom

Phantom est l'un des portefeuilles les plus utilisés sur Solana. Il permet de recevoir des SOL, gérer des tokens SPL, se connecter aux dApps, signer des transactions et utiliser DeFi et DEX. Il est non-custodial — vous contrôlez le portefeuille.

## Installation sécurisée

Téléchargez Phantom uniquement depuis le site officiel ou les stores officiels. Évitez les liens DM, les publicités suspectes, les extensions avec des noms similaires.

## Phrase de récupération (seed phrase)

La seed phrase contrôle le portefeuille. Ne la photographiez jamais, ne la sauvegardez pas dans le cloud, ne l'envoyez pas en chat, ne l'entrez jamais sur un site web. Aucun service légitime ne vous la demandera.

## Connexion du portefeuille

Connecter le portefeuille n'est pas la même chose que signer une transaction. Le site peut voir votre adresse publique mais ne peut pas prendre de fonds sans signature.

## Conclusion

La règle principale : ne partagez jamais votre seed phrase et ne signez jamais de transactions que vous ne comprenez pas.
` },
    PT: { title: "Phantom Wallet — guia completo", desc: "Configuração, segurança e boas práticas para usar Solana.", content: `
## O que é a Phantom

A Phantom é uma das carteiras mais usadas na Solana. Permite receber SOL, gerenciar tokens SPL, conectar-se a dApps, assinar transações e usar DeFi e DEXs. É não custodial — você controla a carteira.

## Instalação segura

Baixe a Phantom apenas do site oficial ou lojas oficiais. Evite: links recebidos por DM, anúncios suspeitos, extensões com nomes similares.

## Frase semente (seed phrase)

A seed phrase controla a carteira. Nunca a fotografe, salve na nuvem, envie em chats ou insira em sites. Nenhum serviço legítimo pedirá sua seed phrase.

## Conectar a carteira

Conectar a carteira não é o mesmo que assinar uma transação. O site pode ver seu endereço público mas não pode pegar fundos sem uma assinatura.

## Conclusão

A regra principal: nunca compartilhe sua seed phrase e nunca assine transações que não entende.
` },
    DE: { title: "Phantom Wallet — vollständiger Leitfaden", desc: "Einrichtung, Sicherheit und Best Practices für Solana.", content: `
## Was ist Phantom

Phantom ist eine der meistgenutzten Wallets auf Solana. Es ermöglicht SOL zu empfangen, SPL-Token zu verwalten, dApps zu verbinden, Transaktionen zu signieren und DeFi und DEXs zu nutzen. Es ist nicht-custodial — du kontrollierst die Wallet.

## Sichere Installation

Lade Phantom nur von der offiziellen Website oder offiziellen Stores herunter. Vermeide: DM-Links, verdächtige Anzeigen, Erweiterungen mit ähnlichen Namen.

## Seed-Phrase

Die Seed-Phrase kontrolliert die Wallet. Fotografiere sie nie, speichere sie nicht in der Cloud, sende sie nicht im Chat und gib sie nie auf Websites ein. Kein seriöser Dienst wird jemals nach deiner Seed-Phrase fragen.

## Wallet verbinden

Die Wallet zu verbinden ist nicht dasselbe wie eine Transaktion zu signieren. Die Seite kann deine öffentliche Adresse sehen, aber ohne Signatur keine Gelder nehmen.

## Fazit

Die Hauptregel: teile deine Seed-Phrase niemals und signiere keine Transaktionen, die du nicht verstehst.
` },
  },
  "impermanent-loss": {
    IT: { title: "Cos'è l'impermanent loss", desc: "Il rischio principale quando fornisci liquidità." },
    EN: { title: "What is impermanent loss", desc: "The main risk when providing liquidity.", content: `
## Why you need to know this

If you provide liquidity to a pool, you are not simply holding tokens in your wallet. You are depositing two assets in a mechanism that constantly rebalances.

This can generate fees, but can also create a relative loss called impermanent loss.

## What it is

Impermanent loss is the difference between: holding assets in your wallet vs. providing them as liquidity in a pool.

It happens when the price of assets changes relative to the moment of deposit.

## Simple example

You deposit in a pool: SOL and your token. If the token price rises a lot, the pool rebalances. When you withdraw, you might have fewer tokens than you would have had by simply holding them in your wallet. That difference is the impermanent loss.

## Why it happens

AMM pools maintain a mathematical ratio between two assets. When users buy a token, the pool sells that token and receives the other asset. This changes the composition of your position. It is not a bug — it is how the automated market works.

## Why it is called impermanent

It is called impermanent because if the price returns to the initial ratio, the theoretical loss can reduce. It becomes real when you withdraw liquidity while the price has changed.

## Fees can compensate

Liquidity providers receive a share of the fees generated by swaps. If volume is high, fees can compensate part of the impermanent loss.

## For memecoins

In memecoins volatility is often high, meaning impermanent loss can be more significant. Providing liquidity can be useful for the project, but it is still a financial risk.

## Conclusion

Before depositing liquidity, understand: how much you can risk, how volatile the token is, how much volume you expect, when you might withdraw, and how you will communicate any changes.
` },
    ES: { title: "Qué es el impermanent loss", desc: "El principal riesgo al proporcionar liquidez.", content: `
## Por qué debes conocerlo

Si proporcionas liquidez a un pool, no estás simplemente reteniendo tokens. Estás depositando dos activos en un mecanismo que se reequilibra continuamente, generando comisiones pero también una posible pérdida relativa llamada impermanent loss.

## Qué es

El impermanent loss es la diferencia entre retener activos en la wallet vs. proporcionarlos como liquidez. Ocurre cuando el precio de los activos cambia respecto al momento del depósito.

## Ejemplo simple

Depositas SOL y tu token. Si el precio del token sube mucho, el pool se reequilibra. Al retirar podrías tener menos tokens que si los hubieras mantenido. Esa diferencia es el impermanent loss.

## Por qué se llama impermanent

Se llama impermanente porque si el precio vuelve al ratio inicial, la pérdida teórica puede reducirse. Se vuelve real cuando retiras liquidez mientras el precio ha cambiado.

## Las comisiones pueden compensar

Los proveedores de liquidez reciben parte de las comisiones de los swaps. Si el volumen es alto, las comisiones pueden compensar parte del impermanent loss.

## Conclusión

Antes de depositar liquidez, entiende cuánto puedes arriesgar, cuán volátil es el token y cuándo podrías retirar.
` },
    FR: { title: "Qu'est-ce que l'impermanent loss", desc: "Le risque principal lors de la fourniture de liquidité.", content: `
## Pourquoi vous devez le connaître

Si vous fournissez de la liquidité à un pool, vous ne retenez pas simplement des tokens. Vous déposez deux actifs dans un mécanisme qui se rééquilibre en permanence, générant des frais mais aussi une perte relative potentielle appelée impermanent loss.

## Ce que c'est

L'impermanent loss est la différence entre retenir des actifs dans votre portefeuille vs. les fournir comme liquidité. Cela se produit quand le prix des actifs change par rapport au moment du dépôt.

## Exemple simple

Vous déposez SOL et votre token. Si le prix du token monte beaucoup, le pool se rééquilibre. En retirant, vous pourriez avoir moins de tokens que si vous les aviez conservés. Cette différence est l'impermanent loss.

## Les frais peuvent compenser

Les fournisseurs de liquidité reçoivent une part des frais générés par les swaps. Si le volume est élevé, les frais peuvent compenser une partie de l'impermanent loss.

## Conclusion

Avant de déposer de la liquidité, comprenez : combien vous pouvez risquer, à quel point le token est volatil et quand vous pourriez retirer.
` },
    PT: { title: "O que é impermanent loss", desc: "O principal risco ao fornecer liquidez.", content: `
## Por que você precisa saber disso

Se você fornece liquidez para um pool, não está simplesmente mantendo tokens. Está depositando dois ativos em um mecanismo que se reequilibra continuamente, gerando taxas mas também uma possível perda relativa chamada impermanent loss.

## O que é

O impermanent loss é a diferença entre manter ativos na carteira vs. fornecê-los como liquidez. Acontece quando o preço dos ativos muda em relação ao momento do depósito.

## Exemplo simples

Você deposita SOL e seu token. Se o preço do token sobe muito, o pool se reequilibra. Ao retirar, você pode ter menos tokens do que teria mantendo na carteira. Essa diferença é o impermanent loss.

## As taxas podem compensar

Provedores de liquidez recebem parte das taxas dos swaps. Se o volume for alto, as taxas podem compensar parte do impermanent loss.

## Conclusão

Antes de depositar liquidez, entenda: quanto você pode arriscar, quão volátil é o token e quando pode retirar.
` },
    DE: { title: "Was ist Impermanent Loss", desc: "Das Hauptrisiko beim Bereitstellen von Liquidität.", content: `
## Warum du das wissen musst

Wenn du Liquidität in einen Pool einbringst, hältst du nicht einfach Token in deiner Wallet. Du hinterlegst zwei Assets in einem Mechanismus, der sich ständig neu ausbalanciert und dabei Gebühren generiert, aber auch einen relativen Verlust namens Impermanent Loss verursachen kann.

## Was es ist

Impermanent Loss ist die Differenz zwischen: Assets in der Wallet halten vs. sie als Liquidität bereitstellen. Es passiert, wenn sich der Preis der Assets gegenüber dem Einzahlungszeitpunkt ändert.

## Einfaches Beispiel

Du hinterlegst SOL und deinen Token. Wenn der Token-Preis stark steigt, balanciert sich der Pool neu aus. Beim Abheben könntest du weniger Token haben als beim einfachen Halten. Diese Differenz ist der Impermanent Loss.

## Gebühren können kompensieren

Liquiditätsanbieter erhalten einen Teil der Swap-Gebühren. Bei hohem Volumen können Gebühren einen Teil des Impermanent Loss ausgleichen.

## Fazit

Bevor du Liquidität einbringst, verstehe: wie viel du riskieren kannst, wie volatil der Token ist und wann du eventuell abheben würdest.
` },
  },
  "glossario": {
    IT: { title: "Glossario crypto — termini essenziali", desc: "Le parole più importanti per capire token, DEX e lanci." },
    EN: { title: "Crypto glossary — essential terms", desc: "The most important words to understand tokens, DEXs and launches.", content: `
## Blockchain

Public ledger of transactions. On Solana, transactions are recorded on-chain and can be consulted through tools like Solscan.

## SOL

The native currency of Solana. Used to pay network fees, swap, create pools and interact with dApps.

## SPL Token

Token standard on Solana. The format used by wallets, DEXs and applications to recognize and manage tokens.

## Wallet

Application that manages keys, assets and transactions. Phantom and Solflare are two popular examples on Solana.

## Seed phrase

Secret phrase that controls the wallet. Never share it.

## Mint address

Unique address of the token. It is the real on-chain identity of the token.

## Supply

Total quantity of tokens created. Does not indicate the value of the project on its own.

## Decimals

Indicate how many parts a token can be divided into. On Solana 9 decimals is standard.

## Metadata

Visible token information: name, symbol, logo, description, links.

## DEX

Decentralized exchange. Allows swapping tokens without a centralized exchange.

## Liquidity pool

Reserve of two assets used to enable swaps. Example: TOKEN/SOL.

## LP token

Token representing your share in a liquidity pool.

## Slippage

Difference between expected price and final swap price. Increases when liquidity is low or the order is large.

## Market cap

Token price multiplied by the considered supply. A useful metric, but must be read together with liquidity and volume.

## Volume

Value traded in a certain period. Real volume indicates market activity.

## Mint Authority

Permission to create new tokens. If active, supply can be increased.

## Freeze Authority

Permission to freeze tokens in specific wallets. For memecoins often a sensitive signal.

## Update Authority

Permission to modify metadata. Can be useful, but after launch can create doubts.

## Rug pull

When those controlling the project remove liquidity or sell in a destructive way.

## Non-custodial

Service that does not control user funds. The user signs transactions from their own wallet.

## FOMO

Fear Of Missing Out. Often leads to buying without analysis.

## FUD

Fear, Uncertainty and Doubt. Can arise from real problems or community panic.

## DYOR

Do Your Own Research. Means doing your own checks before buying or launching.
` },
    ES: { title: "Glosario crypto — términos esenciales", desc: "Las palabras más importantes para entender tokens, DEX y lanzamientos.", content: `
## Blockchain

Registro público de transacciones. En Solana, las transacciones se registran on-chain y pueden consultarse con herramientas como Solscan.

## SOL

La moneda nativa de Solana. Se usa para pagar fees, hacer swaps, crear pools e interactuar con dApps.

## Token SPL

Estándar de tokens en Solana. El formato usado por wallets, DEX y aplicaciones.

## Wallet

Aplicación que gestiona claves, activos y transacciones. Phantom y Solflare son ejemplos populares.

## Seed phrase

Frase secreta que controla la wallet. Nunca la compartas.

## Mint address

Dirección única del token. Es la identidad real del token on-chain.

## Supply

Cantidad total de tokens creada.

## Metadatos

Información visible del token: nombre, símbolo, logo, descripción, enlaces.

## DEX

Exchange descentralizado. Permite intercambiar tokens sin exchange centralizado.

## Pool de liquidez

Reserva de dos activos para permitir swaps. Ejemplo: TOKEN/SOL.

## Slippage

Diferencia entre precio previsto y precio final del swap.

## Market cap

Precio del token multiplicado por la supply considerada.

## Mint Authority

Permiso para crear nuevos tokens. Si está activa, la supply puede aumentarse.

## Freeze Authority

Permiso para congelar tokens en wallets específicas.

## Rug pull

Cuando los controladores del proyecto retiran liquidez o venden de forma destructiva.

## DYOR

Do Your Own Research. Haz tus propias verificaciones antes de comprar o lanzar.
` },
    FR: { title: "Glossaire crypto — termes essentiels", desc: "Les mots les plus importants pour comprendre les tokens, DEX et lancements.", content: `
## Blockchain

Registre public des transactions. Sur Solana, les transactions sont enregistrées on-chain et consultables via Solscan.

## SOL

La monnaie native de Solana. Utilisée pour payer les frais, échanger, créer des pools et interagir avec les dApps.

## Token SPL

Standard des tokens sur Solana. Le format utilisé par les portefeuilles, DEX et applications.

## Portefeuille (Wallet)

Application gérant clés, actifs et transactions. Phantom et Solflare sont des exemples populaires.

## Seed phrase

Phrase secrète contrôlant le portefeuille. Ne la partagez jamais.

## Mint address

Adresse unique du token. C'est la vraie identité on-chain du token.

## Supply

Quantité totale de tokens créée.

## Métadonnées

Informations visibles du token : nom, symbole, logo, description, liens.

## DEX

Exchange décentralisé permettant d'échanger des tokens sans exchange centralisé.

## Pool de liquidité

Réserve de deux actifs pour permettre les swaps. Exemple : TOKEN/SOL.

## Slippage

Différence entre le prix prévu et le prix final du swap.

## Mint Authority

Permission de créer de nouveaux tokens. Si active, la supply peut être augmentée.

## Rug pull

Quand les contrôleurs du projet retirent la liquidité ou vendent de manière destructive.

## DYOR

Do Your Own Research. Faites vos propres vérifications avant d'acheter ou de lancer.
` },
    PT: { title: "Glossário crypto — termos essenciais", desc: "As palavras mais importantes para entender tokens, DEXs e lançamentos.", content: `
## Blockchain

Registro público de transações. Na Solana, as transações são registradas on-chain e podem ser consultadas com ferramentas como Solscan.

## SOL

A moeda nativa da Solana. Usada para pagar taxas, fazer swaps, criar pools e interagir com dApps.

## Token SPL

Padrão de tokens na Solana. O formato usado por carteiras, DEXs e aplicações.

## Carteira (Wallet)

Aplicativo que gerencia chaves, ativos e transações. Phantom e Solflare são exemplos populares.

## Seed phrase

Frase secreta que controla a carteira. Nunca a compartilhe.

## Mint address

Endereço único do token. É a identidade real do token on-chain.

## Supply

Quantidade total de tokens criada.

## Metadados

Informações visíveis do token: nome, símbolo, logo, descrição, links.

## DEX

Exchange descentralizada. Permite trocar tokens sem exchange centralizada.

## Pool de liquidez

Reserva de dois ativos para permitir swaps. Exemplo: TOKEN/SOL.

## Mint Authority

Permissão para criar novos tokens. Se ativa, a supply pode ser aumentada.

## Rug pull

Quando os controladores do projeto removem liquidez ou vendem de forma destrutiva.

## DYOR

Do Your Own Research. Faça suas próprias verificações antes de comprar ou lançar.
` },
    DE: { title: "Krypto-Glossar — wesentliche Begriffe", desc: "Die wichtigsten Wörter zum Verstehen von Tokens, DEXs und Launches.", content: `
## Blockchain

Öffentliches Transaktionsregister. Auf Solana werden Transaktionen on-chain aufgezeichnet und können über Tools wie Solscan abgerufen werden.

## SOL

Die native Währung von Solana. Wird für Gebühren, Swaps, Pool-Erstellung und dApp-Interaktionen verwendet.

## SPL-Token

Token-Standard auf Solana. Das Format für Wallets, DEXs und Anwendungen.

## Wallet

Anwendung für Schlüssel, Assets und Transaktionen. Phantom und Solflare sind beliebte Beispiele.

## Seed-Phrase

Geheime Phrase, die die Wallet kontrolliert. Teile sie niemals.

## Mint-Adresse

Eindeutige Adresse des Tokens. Die echte on-chain Identität.

## Supply

Gesamtmenge der erstellten Token.

## Metadaten

Sichtbare Token-Informationen: Name, Symbol, Logo, Beschreibung, Links.

## DEX

Dezentrale Börse für Token-Tausch ohne zentralisierte Exchange.

## Liquiditätspool

Reserve aus zwei Assets für Swaps. Beispiel: TOKEN/SOL.

## Mint Authority

Erlaubnis, neue Token zu erstellen. Wenn aktiv, kann Supply erhöht werden.

## Rug Pull

Wenn Projektkontrolleure Liquidität entfernen oder zerstörerisch verkaufen.

## DYOR

Do Your Own Research. Eigene Prüfungen vor Kauf oder Launch.
` },
  },
  "pumpfun-vs-solmint": {
    IT: { title: "Pump.fun vs SolMint — differenze reali", desc: "Quando usare un launch veloce e quando serve più controllo." },
    EN: { title: "Pump.fun vs SolMint — real differences", desc: "When to use a fast launch and when you need more control.", content: `
## Two different tools

Pump.fun and SolMint are not the same thing.

Pump.fun is designed to launch tokens extremely quickly inside a viral feed.

SolMint is designed for creators who want more control over branding, metadata, authorities and launch preparation.

The choice depends on the objective.

## Pump.fun

Pump.fun works well if you want to test a meme quickly.

Strengths: immediate launch, organic traffic, very active feed, strong memecoin culture, simple experience.

Limitations: more limited branding, enormous competition, many tokens look similar, often short lifespan, hard to build trust outside the feed.

## SolMint

SolMint is more suitable if you want to prepare a token with a more polished identity.

Strengths: complete metadata, curated logo and links, manageable authorities, AI for finding narrative, tools for trends and launch, greater control over the token.

Limitations: requires more preparation, does not replace community and marketing, does not automatically offer traffic like a viral feed.

## Which to choose

Use a fast launch if you want to: test memes, ride immediate hype, do quick experiments, bet everything on the feed.

Use a more polished approach if you want to: build a brand, create a community, better communicate supply, manage authorities, prepare liquidity, appear more credible.

## The truth

The platform does not save a weak launch. A token needs a clear idea, real community, timing, liquidity, trust and consistent communication. Technology helps. Attention must be built.
` },
    ES: { title: "Pump.fun vs SolMint — diferencias reales", desc: "Cuándo usar un lanzamiento rápido y cuándo se necesita más control.", content: `
## Dos herramientas diferentes

Pump.fun está diseñado para lanzar tokens muy rápidamente en un feed viral. SolMint está diseñado para creadores que quieren más control sobre branding, metadatos, authorities y preparación del lanzamiento.

## Pump.fun

Funciona bien para testear memes rápidamente. Puntos fuertes: lanzamiento inmediato, tráfico orgánico, feed muy activo, cultura memecoin fuerte. Limitaciones: branding limitado, competencia enorme, vida media corta.

## SolMint

Más adecuado para preparar un token con identidad más cuidada. Puntos fuertes: metadatos completos, authorities gestionables, IA para encontrar narrativa, mayor control. Limitaciones: requiere más preparación.

## Cuál elegir

Lanzamiento rápido: para testear memes, aprovechar hype inmediato, hacer experimentos rápidos.

Enfoque más cuidado: para construir marca, crear comunidad, gestionar authorities, preparar liquidez, parecer más creíble.

## La verdad

La plataforma no salva un lanzamiento débil. Un token necesita idea clara, comunidad real, timing, liquidez y comunicación constante.
` },
    FR: { title: "Pump.fun vs SolMint — vraies différences", desc: "Quand utiliser un lancement rapide et quand il faut plus de contrôle.", content: `
## Deux outils différents

Pump.fun est conçu pour lancer des tokens très rapidement dans un feed viral. SolMint est conçu pour les créateurs qui veulent plus de contrôle sur le branding, les métadonnées, les authorities et la préparation du lancement.

## Pump.fun

Fonctionne bien pour tester un mème rapidement. Points forts : lancement immédiat, trafic organique, feed très actif. Limitations : branding limité, compétition énorme, vie courte.

## SolMint

Plus adapté pour préparer un token avec une identité soignée. Points forts : métadonnées complètes, authorities gérables, IA pour trouver une narrative, plus grand contrôle. Limitations : nécessite plus de préparation.

## Lequel choisir

Lancement rapide : pour tester des mèmes, surfer sur l'hype immédiate, faire des expériences rapides.

Approche soignée : pour construire une marque, créer une communauté, gérer les authorities, préparer la liquidité.

## La vérité

La plateforme ne sauve pas un lancement faible. Un token a besoin d'une idée claire, d'une vraie communauté et d'une communication constante.
` },
    PT: { title: "Pump.fun vs SolMint — diferenças reais", desc: "Quando usar um lançamento rápido e quando precisa de mais controle.", content: `
## Duas ferramentas diferentes

Pump.fun é projetado para lançar tokens muito rapidamente em um feed viral. SolMint é projetado para criadores que querem mais controle sobre branding, metadados, authorities e preparação do lançamento.

## Pump.fun

Funciona bem para testar memes rapidamente. Pontos fortes: lançamento imediato, tráfego orgânico, feed muito ativo. Limitações: branding limitado, competição enorme, vida média curta.

## SolMint

Mais adequado para preparar um token com identidade mais cuidada. Pontos fortes: metadados completos, authorities gerenciáveis, IA para encontrar narrativa, maior controle. Limitações: requer mais preparação.

## Qual escolher

Lançamento rápido: para testar memes, aproveitar hype imediato, fazer experimentos rápidos.

Abordagem mais cuidada: para construir marca, criar comunidade, gerenciar authorities, preparar liquidez.

## A verdade

A plataforma não salva um lançamento fraco. Um token precisa de ideia clara, comunidade real, timing, liquidez e comunicação constante.
` },
    DE: { title: "Pump.fun vs SolMint — echte Unterschiede", desc: "Wann man einen schnellen Launch nutzt und wann man mehr Kontrolle braucht.", content: `
## Zwei verschiedene Tools

Pump.fun ist für extrem schnelle Token-Launches in einem viralen Feed konzipiert. SolMint ist für Creator gedacht, die mehr Kontrolle über Branding, Metadaten, Authorities und Launch-Vorbereitung wollen.

## Pump.fun

Gut geeignet zum schnellen Testen eines Memes. Stärken: sofortiger Launch, organischer Traffic, sehr aktiver Feed. Einschränkungen: begrenztes Branding, enorme Konkurrenz, oft kurze Lebensdauer.

## SolMint

Besser geeignet für Token mit sorgfältigerer Identität. Stärken: vollständige Metadaten, verwaltbare Authorities, KI für Narrative, mehr Kontrolle. Einschränkungen: erfordert mehr Vorbereitung.

## Was wählen

Schneller Launch: für Meme-Tests, sofortigen Hype, schnelle Experimente.

Sorgfältigerer Ansatz: für Markenaufbau, Community, Authority-Management, Liquiditätsvorbereitung.

## Die Wahrheit

Die Plattform rettet keinen schwachen Launch. Ein Token braucht eine klare Idee, echte Community, Timing, Liquidität und konsistente Kommunikation.
` },
  },
  "come-diventare-trending": {
    IT: { title: "Come andare trending su DexScreener", desc: "Le metriche che attirano attenzione nei primi minuti." },
    EN: { title: "How to trend on DexScreener", desc: "The metrics that attract attention in the first minutes.", content: `
## Trending is not random

DexScreener shows tokens that are generating activity. You need volume, transactions, liquidity, attention and a narrative that makes people click.

## Observed metrics

Users look at: 24h volume, price change, liquidity, number of transactions, recent purchases, market cap, pool age.

These data help understand if a token is alive or stagnant.

## The first minutes

Many tokens die because they are launched with nobody ready.

Before the pool you should have: active community, ready logo, active Telegram or X, official mint address, prepared messages, first memes, supply explanation.

A launch without initial attention is hard to recover.

## Branding in the feed

In the feed users decide in seconds. To increase clicks you need: readable name, strong logo, memorable ticker, simple narrative, working socials.

The token must be understandable before even opening the chart.

## Real volume

Volume attracts attention, but must be credible. Fake or artificial volume can create suspicion. Better to have real activity from a real community, even if smaller.

## What ruins a launch

Common mistakes: empty socials, missing logo, active freeze authority, creator selling immediately, too little liquidity, fake community, aggressive promises, unverifiable mint address.

## No guaranteed trick exists

No guaranteed method exists for trending. The best launches combine: preparation, timing, real volume, community, branding and trust.
` },
    ES: { title: "Cómo ir a trending en DexScreener", desc: "Las métricas que atraen atención en los primeros minutos.", content: `
## Estar en trending no es casual

DexScreener muestra tokens que están generando actividad. Necesitas volumen, transacciones, liquidez y una narrativa que haga clicar.

## Métricas observadas

Los usuarios miran: volumen 24h, variación de precio, liquidez, número de transacciones, compras recientes, market cap, edad del pool.

## Los primeros minutos

Antes del pool deberías tener: comunidad activa, logo listo, Telegram o X activos, mint address oficial, mensajes preparados, primeros memes.

## Branding en el feed

Para aumentar los clics: nombre legible, logo fuerte, ticker memorable, narrativa simple, redes sociales funcionando.

## Volumen real

El volumen atrae atención pero debe ser creíble. Mejor actividad real de una comunidad real, aunque sea más pequeña.

## No existe truco garantizado

Los mejores lanzamientos combinan: preparación, timing, volumen real, comunidad, branding y confianza.
` },
    FR: { title: "Comment être trending sur DexScreener", desc: "Les métriques qui attirent l'attention dans les premières minutes.", content: `
## Être trending n'est pas aléatoire

DexScreener montre les tokens qui génèrent de l'activité. Vous avez besoin de volume, transactions, liquidité et d'une narrative qui fait cliquer.

## Métriques observées

Les utilisateurs regardent : volume 24h, variation de prix, liquidité, nombre de transactions, achats récents, market cap, âge du pool.

## Les premières minutes

Avant le pool vous devriez avoir : communauté active, logo prêt, Telegram ou X actifs, mint address officielle, messages préparés, premiers mèmes.

## Branding dans le feed

Pour augmenter les clics : nom lisible, logo fort, ticker mémorable, narrative simple, réseaux sociaux fonctionnels.

## Aucun truc garanti n'existe

Les meilleurs lancements combinent : préparation, timing, vrai volume, communauté, branding et confiance.
` },
    PT: { title: "Como ir para trending no DexScreener", desc: "As métricas que atraem atenção nos primeiros minutos.", content: `
## Trending não é aleatório

DexScreener mostra tokens que estão gerando atividade. Você precisa de volume, transações, liquidez e uma narrativa que faça as pessoas clicarem.

## Métricas observadas

Os usuários olham: volume 24h, variação de preço, liquidez, número de transações, compras recentes, market cap, idade do pool.

## Os primeiros minutos

Antes do pool você deve ter: comunidade ativa, logo pronto, Telegram ou X ativos, mint address oficial, mensagens preparadas, primeiros memes.

## Branding no feed

Para aumentar os cliques: nome legível, logo forte, ticker memorável, narrativa simples, redes sociais funcionando.

## Nenhum truque garantido existe

Os melhores lançamentos combinam: preparação, timing, volume real, comunidade, branding e confiança.
` },
    DE: { title: "Wie man auf DexScreener trendet", desc: "Die Metriken, die in den ersten Minuten Aufmerksamkeit erregen.", content: `
## Trending ist nicht zufällig

DexScreener zeigt Token, die Aktivität generieren. Du brauchst Volumen, Transaktionen, Liquidität und eine Narrative, die zum Klicken einlädt.

## Beobachtete Metriken

Nutzer schauen auf: 24h-Volumen, Preisveränderung, Liquidität, Transaktionsanzahl, aktuelle Käufe, Market Cap, Pool-Alter.

## Die ersten Minuten

Vor dem Pool solltest du haben: aktive Community, fertiges Logo, aktives Telegram oder X, offizielle Mint-Adresse, vorbereitete Nachrichten, erste Memes.

## Branding im Feed

Um Klicks zu erhöhen: lesbarer Name, starkes Logo, einprägsamer Ticker, einfache Narrative, funktionierende Socials.

## Kein garantierter Trick existiert

Die besten Launches kombinieren: Vorbereitung, Timing, echtes Volumen, Community, Branding und Vertrauen.
` },
  },
  "ai-memecoin-future": {
    IT: { title: "AI memecoin — il futuro dei token virali?", desc: "Come usare AI senza creare token tutti uguali." },
    EN: { title: "AI memecoins — the future of viral tokens?", desc: "How to use AI without creating cookie-cutter tokens.", content: `
## AI is changing memecoins

Artificial intelligence is entering the world of viral tokens. Today it can help create: names, tickers, logos, descriptions, memes, launch strategies and narrative variants.

This greatly speeds up creators' work.

## Why it is useful

Memecoins live on attention. AI can help to: analyze trends, generate many ideas, find creative angles, create initial branding, produce content quickly, transform a trend into a concept.

Used well, it is an accelerator.

## The risk

If everyone uses AI in the same way, tokens become similar. The result can seem generic, cold or fake.

To avoid this you need to add: human taste, internet culture, timing, community, real irony, specific references.

## AI plus live data

The most interesting combination is AI + live trends. Looking at what is performing now and generating ideas inspired by the moment can be more effective than inventing tokens randomly.

It does not mean copying. It means understanding the context.

## What AI does well

AI is useful for: brainstorming, naming, descriptions, image prompts, narrative analysis, concept variants, meme ideas.

## What it cannot replace

AI does not replace: real community, timing, taste, trust, launch management, creator presence.

A well-generated token that is badly managed remains weak.

## Conclusion

AI will make launches faster. But the difference will remain human: understanding what makes people laugh, what creates identity and what pushes a community to participate.
` },
    ES: { title: "AI memecoins — ¿el futuro de los tokens virales?", desc: "Cómo usar IA sin crear tokens todos iguales.", content: `
## La IA está cambiando los memecoins

La IA puede ayudar a crear nombres, tickers, logos, descripciones, memes y estrategias de lanzamiento. Esto acelera mucho el trabajo de los creadores.

## Por qué es útil

Los memecoins viven de la atención. La IA puede analizar tendencias, generar muchas ideas, encontrar ángulos creativos y transformar una tendencia en concepto.

## El riesgo

Si todos usan IA de la misma manera, los tokens se vuelven similares. Para evitarlo necesitas agregar: gusto humano, cultura internet, timing, comunidad, ironía real.

## IA más datos en vivo

La combinación más interesante es IA + tendencias en vivo. No significa copiar, sino entender el contexto.

## Qué no puede reemplazar

La IA no reemplaza: comunidad real, timing, gusto, confianza, gestión del lanzamiento, presencia del creador.

## Conclusión

La IA hará los lanzamientos más rápidos. Pero la diferencia seguirá siendo humana: entender qué hace reír, qué crea identidad y qué empuja a una comunidad a participar.
` },
    FR: { title: "AI memecoins — l'avenir des tokens viraux?", desc: "Comment utiliser l'IA sans créer des tokens tous identiques.", content: `
## L'IA change les memecoins

L'IA peut aider à créer des noms, tickers, logos, descriptions, mèmes et stratégies de lancement. Cela accélère beaucoup le travail des créateurs.

## Pourquoi c'est utile

Les memecoins vivent de l'attention. L'IA peut analyser les tendances, générer beaucoup d'idées, trouver des angles créatifs et transformer une tendance en concept.

## Le risque

Si tout le monde utilise l'IA de la même façon, les tokens deviennent similaires. Pour l'éviter, il faut ajouter : goût humain, culture internet, timing, communauté, vraie ironie.

## Ce qu'elle ne peut pas remplacer

L'IA ne remplace pas : vraie communauté, timing, goût, confiance, gestion du lancement, présence du créateur.

## Conclusion

L'IA rendra les lancements plus rapides. Mais la différence restera humaine : comprendre ce qui fait rire, crée de l'identité et pousse une communauté à participer.
` },
    PT: { title: "AI memecoins — o futuro dos tokens virais?", desc: "Como usar IA sem criar tokens todos iguais.", content: `
## A IA está mudando as memecoins

A IA pode ajudar a criar nomes, tickers, logos, descrições, memes e estratégias de lançamento. Isso acelera muito o trabalho dos criadores.

## Por que é útil

Memecoins vivem de atenção. A IA pode analisar tendências, gerar muitas ideias, encontrar ângulos criativos e transformar uma tendência em conceito.

## O risco

Se todos usarem IA da mesma forma, os tokens ficam similares. Para evitar isso, adicione: gosto humano, cultura de internet, timing, comunidade, ironia real.

## O que ela não pode substituir

A IA não substitui: comunidade real, timing, gosto, confiança, gestão do lançamento, presença do criador.

## Conclusão

A IA tornará os lançamentos mais rápidos. Mas a diferença continuará sendo humana: entender o que faz rir, cria identidade e empurra uma comunidade a participar.
` },
    DE: { title: "AI Memecoins — die Zukunft viraler Tokens?", desc: "Wie man KI nutzt, ohne identische Tokens zu erstellen.", content: `
## KI verändert Memecoins

KI kann helfen, Namen, Ticker, Logos, Beschreibungen, Memes und Launch-Strategien zu erstellen. Das beschleunigt die Arbeit von Creatorn erheblich.

## Warum es nützlich ist

Memecoins leben von Aufmerksamkeit. KI kann Trends analysieren, viele Ideen generieren, kreative Winkel finden und einen Trend in ein Konzept verwandeln.

## Das Risiko

Wenn alle KI auf die gleiche Weise nutzen, werden Token ähnlich. Um das zu vermeiden, musst du hinzufügen: menschlichen Geschmack, Internet-Kultur, Timing, Community, echte Ironie.

## Was sie nicht ersetzen kann

KI ersetzt nicht: echte Community, Timing, Geschmack, Vertrauen, Launch-Management, Creator-Präsenz.

## Fazit

KI wird Launches schneller machen. Aber der Unterschied bleibt menschlich: verstehen, was zum Lachen bringt, Identität schafft und eine Community zur Teilnahme bewegt.
` },
  },
};

export function getGuideTitle(id: string, lang: GuideLang): string {
  return GUIDE_I18N[id]?.[lang]?.title ?? GUIDE_I18N[id]?.IT?.title ?? id;
}

export function getGuideDesc(id: string, lang: GuideLang): string {
  return GUIDE_I18N[id]?.[lang]?.desc ?? GUIDE_I18N[id]?.IT?.desc ?? "";
}

export function getGuideContent(id: string, lang: GuideLang, fallbackIT: string): string {
  return GUIDE_I18N[id]?.[lang]?.content ?? GUIDE_I18N[id]?.IT?.content ?? fallbackIT;
}
