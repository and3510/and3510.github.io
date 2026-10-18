---
title: "SonarQube: qualidade de código no pipeline"
description: "O que o SonarQube analisa, como subir um servidor com Docker e como integrá-lo ao build e ao CI/CD."
date: 2026-10-17
updatedDate: 2026-10-17
prerequisites: [ci-cd/integracao-entrega-e-implantacao-continuas]
related: [ci-cd/pipeline-com-github-actions, ci-cd/pipeline-com-gitlab-ci]
---

## O que é

O **SonarQube** é uma plataforma de código aberto que inspeciona continuamente a qualidade do código-fonte, identificando **bugs, vulnerabilidades, code smells (más práticas), cobertura de testes e duplicação de código**.

- **Múltiplas linguagens:** Java, JavaScript, TypeScript, Python, C#, C++, PHP, entre outras.
- **Integração com CI/CD:** Jenkins, GitHub Actions, GitLab CI, Azure DevOps, Bitbucket.
- **Dashboards e métricas:** tendências, cobertura, dívida técnica e manutenibilidade.
- **Detecção de vulnerabilidades:** injeções, XSS e outras falhas, o que o torna uma peça de SAST dentro do DevSecOps.

## Como funciona

1. **Servidor:** instalado localmente (Docker, zip) ou usado como SaaS pelo **SonarCloud**.
2. **Scanner:** o **SonarScanner** coleta os dados do projeto e envia ao servidor. Integra-se ao build (Maven, Gradle, npm, dotnet).
3. **Análise:** o servidor processa o código e mostra os resultados na interface web, com problemas classificados por severidade: *blocker, critical, major, minor*.

## Subindo o servidor

```bash
docker run -d --name sonarqube \
  -p 9000:9000 \
  sonarqube:latest
```

A interface fica em `http://localhost:9000`.

## Analisando um projeto Java com Maven

```xml
<plugin>
  <groupId>org.sonarsource.scanner.maven</groupId>
  <artifactId>sonar-maven-plugin</artifactId>
  <version>3.9.1.2184</version>
</plugin>
```

```bash
mvn clean verify sonar:sonar \
  -Dsonar.projectKey=meu-projeto \
  -Dsonar.host.url=http://localhost:9000 \
  -Dsonar.token=$SONAR_TOKEN
```

> O token nunca vai no repositório: guarde-o como segredo do pipeline. (Versões recentes do SonarQube usam `sonar.token`; `sonar.login` é a forma antiga.)

## Métricas que importam

- **Coverage:** percentual de código coberto por testes.
- **Bugs e Vulnerabilities:** problemas críticos de lógica e de segurança.
- **Code Smells:** práticas ruins de codificação.
- **Technical Debt:** tempo estimado para corrigir os problemas.
- **Maintainability Rating:** quão fácil é manter o código.

## No pipeline

O SonarQube entra como uma etapa de qualidade depois dos testes (que geram o relatório de cobertura) e antes do build final/deploy. O ganho real vem do **Quality Gate**: um conjunto de condições (cobertura mínima, zero vulnerabilidades novas, etc.) que, se não atendido, **falha o pipeline**.

```yaml
# Exemplo no GitHub Actions
- name: SonarQube Scan
  uses: SonarSource/sonarqube-scan-action@v5
  env:
    SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
    SONAR_HOST_URL: ${{ secrets.SONAR_HOST_URL }}
```

Veja a estrutura geral em [[pipeline-com-github-actions|Pipeline com GitHub Actions]] e [[pipeline-com-gitlab-ci|Pipeline com GitLab CI]].
