module Jekyll
  class TagPageGenerator < Generator
    safe true

    def generate(site)
      tags = site.collections['notes'].docs.flat_map { |note| note.data['tags'] || [] }.uniq

      tags.each do |tag|
        site.pages << TagPage.new(site, site.source, tag)
      end
    end
  end

  class TagPage < Page
    def initialize(site, base, tag)
      @site = site
      @base = base
      @dir = File.join('tag', tag)
      @name = 'index.html'

      self.process(@name)
      self.read_yaml(File.join(base, '_layouts'), 'archive.html')
      self.data['tag'] = tag
      self.data['title'] = "Notes tagged with ##{tag}"
    end
  end
end