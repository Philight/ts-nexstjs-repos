# Task description

## Goal

Vytvořte jednoduchý průzkumník repozitářů GitHub pomocí Next.js, GraphQL a TypeScript. Průzkumník by měl uživatelům umožnit hledat repozitáře podle jejich názvu a zobrazovat relevantní informace o repozitářích.

Požadavky

Nastavte aplikaci Next.js s TypeScriptem.

Použijte GitHub GraphQL API (https://docs.github.com/en/graphql) pro dotazování dat repozitářů.
Pro ověřování budete muset vytvořit osobní přístupový token (https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token).

Použijte Apollo Client nebo jinou knihovnu pro klienta GraphQL pro integraci GitHub GraphQL API s frontendem Next.js.

Vytvořte vyhledávací formulář, který umožňuje uživatelům zadat vyhledávací dotaz (název repozitáře) a odeslat formulář.

Po odeslání formuláře získejte seznam repozitářů, které odpovídají vyhledávacímu dotazu, pomocí GitHub GraphQL API. Omezte výsledky na 10 nejlepších repozitářů seřazených podle počtu hvězdiček.

Zobrazte seznam repozitářů s následujícími informacemi:

- Název repozitáře (s odkazem na stránku repozitáře na GitHubu)
- Popis repozitáře
- Majitel repozitáře (s odkazem na jeho GitHub profil)
- Počet hvězdiček
- Primární programovací jazyk použitý v repozitáři
- Implementujte responzivní design a zajistěte, aby aplikace vypadala dobře na různých velikostech obrazovek a zařízeních.