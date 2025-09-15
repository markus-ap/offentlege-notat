---
layout: default
title: All Notes
permalink: /notes/
---

# All Notes

<ul class="notes-list">
  {% assign sorted_notes = site.notes | sort: 'date' | reverse %}
  {% for note in sorted_notes %}
    <li class="notes-list-item">
      <h3 class="notes-list-title">
        <a href="{{ note.url | relative_url }}">{{ note.title }}</a>
      </h3>
      <p class="notes-list-meta">
        {% if note.date %}
          <time datetime="{{ note.date | date_to_xmlschema }}">{{ note.date | date: "%B %d, %Y" }}</time>
        {% endif %}
        {% if note.tags %}
          {% for tag in note.tags %}
            <a href="{{ '/tag/' | append: tag | relative_url }}" class="tag">#{{ tag }}</a>
          {% endfor %}
        {% endif %}
      </p>
      {% if note.excerpt %}
        <p class="notes-list-excerpt">{{ note.excerpt | strip_html | truncatewords: 40 }}</p>
      {% endif %}
    </li>
  {% endfor %}
</ul>