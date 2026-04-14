# ─── Build (full SDK) ───────────────────────────────────────────────────────
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY backEnd.csproj ./
RUN dotnet restore backEnd.csproj

COPY . ./
RUN dotnet publish backEnd.csproj -c Release -o /app/publish --no-restore

# ─── Run (ASP.NET runtime only, smaller image) ──────────────────────────────
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
WORKDIR /app

ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080

COPY --from=build /app/publish .

USER $APP_UID

ENTRYPOINT ["dotnet", "backEnd.dll"]
