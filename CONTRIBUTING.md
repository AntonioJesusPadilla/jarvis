# 🤝 Contribuyendo a Jarvis

¡Gracias por tu interés en contribuir al proyecto **Jarvis - Asistente de Investigación Inteligente**!

## 👨‍💻 Autor Original

**Antonio Jesús Padilla** - Creador y desarrollador principal del proyecto completo.

## 🌟 Cómo Contribuir

### 🐛 Reportar Bugs

1. **Verifica** que el bug no haya sido reportado antes
2. **Abre un issue** con:
   - Descripción clara del problema
   - Pasos para reproducir
   - Comportamiento esperado vs actual
   - Screenshots si es relevante
   - Información del entorno (OS, versiones)

### 💡 Sugerir Características

1. **Abre un issue** etiquetado como `enhancement`
2. **Describe claramente**:
   - El problema que resuelve
   - La solución propuesta
   - Alternativas consideradas
   - Impacto en usuarios existentes

### 🔧 Enviar Pull Requests

1. **Fork** el repositorio
2. **Crea una rama** descriptiva:
   ```bash
   git checkout -b feature/nueva-caracteristica
   # o
   git checkout -b fix/correccion-bug
   ```

3. **Desarrolla** siguiendo las convenciones:
   - Código limpio y comentado
   - Mantén el estilo consistente
   - Añade tests si es necesario

4. **Commit** con mensajes descriptivos:
   ```bash
   git commit -m "feat: añadir funcionalidad X"
   git commit -m "fix: corregir problema Y"
   git commit -m "docs: actualizar README"
   ```

5. **Push** y abre el Pull Request:
   ```bash
   git push origin feature/nueva-caracteristica
   ```

## 📋 Convenciones de Código

### Frontend (TypeScript/React)
- Usar **TypeScript** estricto
- Componentes funcionales con hooks
- Naming: `PascalCase` para componentes
- Props: interfaces claramente definidas

### Backend (Python/FastAPI)
- Seguir **PEP 8**
- Type hints obligatorios
- Documentación en docstrings
- Naming: `snake_case`

### Commits
Usamos **Conventional Commits**:
- `feat:` nueva característica
- `fix:` corrección de bug
- `docs:` documentación
- `style:` formateo (sin cambios de código)
- `refactor:` refactoring
- `test:` añadir/corregir tests
- `chore:` mantenimiento

## 🧪 Testing

### Frontend
```bash
cd frontend
npm run test        # Jest tests
npm run lint        # ESLint
npm run type-check  # TypeScript check
```

### Backend
```bash
cd api
python -m pytest   # Ejecutar tests
python -m flake8   # Linting
python -m mypy .   # Type checking
```

## 📝 Documentación

- Mantén el README actualizado
- Documenta APIs y componentes importantes
- Incluye ejemplos de uso
- Screenshots para cambios UI

## 🔍 Revisión de Código

Todo PR será revisado para:
- ✅ Funcionalidad correcta
- ✅ Calidad del código
- ✅ Tests apropiados
- ✅ Documentación actualizada
- ✅ Sin breaking changes

## 🏷️ Versionado

Seguimos **Semantic Versioning** (SemVer):
- `MAJOR`: cambios incompatibles
- `MINOR`: nueva funcionalidad compatible
- `PATCH`: correcciones compatibles

## 🤔 ¿Preguntas?

Si tienes dudas:
1. Revisa la documentación existente
2. Busca en issues cerrados
3. Abre un issue con la etiqueta `question`

---

## 📄 Código de Conducta

### Nuestro Compromiso

Nos comprometemos a hacer de la participación en nuestro proyecto una experiencia libre de acoso para todos.

### Estándares

**Comportamientos que contribuyen a un ambiente positivo:**
- Usar lenguaje acogedor e inclusivo
- Respetar diferentes puntos de vista
- Aceptar críticas constructivas
- Enfocarse en lo mejor para la comunidad
- Mostrar empatía hacia otros miembros

**Comportamientos inaceptables:**
- Uso de lenguaje o imágenes sexualizadas
- Trolling, insultos o comentarios despectivos
- Acoso público o privado
- Publicar información privada sin permiso
- Cualquier conducta inapropiada en un entorno profesional

### Aplicación

Los casos de comportamiento abusivo, acosador o inaceptable pueden ser reportados contactando al equipo del proyecto.

---

**¡Gracias por contribuir a Jarvis!** 🤖✨

*Desarrollado por Antonio Jesús Padilla*
